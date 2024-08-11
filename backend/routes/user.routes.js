import express from "express";
import { register } from "../controller/user.controller.js";
const router = express.Router();

router.route("/register").post(register);
