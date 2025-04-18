import os
import time
import base64
import shutil
import uuid
import requests
from fastapi import FastAPI, Form
from fastapi.responses import FileResponse, JSONResponse
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from urllib.parse import urljoin
from selenium.webdriver.common.by import By
from concurrent.futures import ThreadPoolExecutor
from pypdf import PdfWriter

app = FastAPI()

# Setup Chrome driver once for reuse
chrome_options = Options()
chrome_options.add_argument("--headless=new")
chrome_options.add_argument("--disable-gpu")

@app.post("/scrape")
async def scrape_website(url: str = Form(...), threads: int = Form(5)):
    session_id = str(uuid.uuid4())
    output_folder = os.path.join("sessions", session_id)
    pdf_folder = os.path.join(output_folder, "pdf_pages")
    output_pdf_path = os.path.join(output_folder, "scraped_output.pdf")

    os.makedirs(pdf_folder, exist_ok=True)

    headers = {
        "User-Agent": "Mozilla/5.0 Chrome/120.0.0.0"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        links = {urljoin(url, a['href']) for a in soup.find_all('a', href=True)}
    except Exception as e:
        return JSONResponse(content={"error": f"Failed to fetch base URL: {str(e)}"}, status_code=400)

    links = sorted(links)
    if not links:
        return JSONResponse(content={"error": "No links found on the page."}, status_code=404)

    def process_page(index, link):
        pdf_file = os.path.join(pdf_folder, f"page_{index}.pdf")
        driver = None
        try:
            driver = webdriver.Chrome(options=chrome_options)
            driver.get(link)

            WebDriverWait(driver, 10).until(
                lambda d: d.execute_script("return document.readyState") == "complete"
            )

            time.sleep(2)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1)

            pdf_data = driver.execute_cdp_cmd("Page.printToPDF", {
                "printBackground": True,
                "transferMode": "ReturnAsBase64",
                "preferCSSPageSize": True,
                "scale": 1.0
            })

            with open(pdf_file, 'wb') as f:
                f.write(base64.b64decode(pdf_data['data']))

            return pdf_file if os.path.exists(pdf_file) else None

        except Exception as e:
            print(f"Error processing {link}: {e}")
            return None
        finally:
            if driver:
                driver.quit()

    # Run multithreaded PDF generation
    pdf_files = []
    with ThreadPoolExecutor(max_workers=threads) as executor:
        futures = [executor.submit(process_page, i + 1, link) for i, link in enumerate(links)]
        for future in futures:
            result = future.result()
            if result:
                pdf_files.append(result)

    if not pdf_files:
        return JSONResponse(content={"error": "No valid PDFs were generated."}, status_code=500)

    try:
        writer = PdfWriter()
        for pdf in sorted(pdf_files, key=lambda x: int(os.path.basename(x).split('_')[1].split('.')[0])):
            writer.append(pdf)

        writer.write(output_pdf_path)
        writer.close()
    except Exception as e:
        return JSONResponse(content={"error": f"Failed to merge PDFs: {e}"}, status_code=500)

    # ✅ Return the PDF file for download
    return FileResponse(
        output_pdf_path,
        media_type="application/pdf",
        filename="scraped_output.pdf"
    )
