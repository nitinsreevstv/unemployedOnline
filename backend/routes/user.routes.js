import express from "express";
import { logIn, register } from "../controller/user.controller.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/register").post(logIn);
