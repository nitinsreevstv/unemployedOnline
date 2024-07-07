function saveToFile() {
    // Get form data
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company');
    const msg = document.getElementById('message');

    // Create a text content
    const content = `Name: ${name}\nEmail: ${email}\nphone: ${phone}\ncompany name : ${company}\n message : ${msg} `;

    // Create a Blob from the text content
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a link element
    const a = document.createElement('a');

    // Set the download attribute with a filename
    a.download = 'formData.txt';

    // Create an object URL and set it as the href attribute
    a.href = window.URL.createObjectURL(blob);

    // Append the link to the body
    document.body.appendChild(a);

    // Programmatically click the link to trigger the download
    a.click();

    // Remove the link from the document
    document.body.removeChild(a);
}