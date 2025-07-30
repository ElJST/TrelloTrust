import express from "express";
import {
  register,
  login,
  getIdUserByEmail
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/get-id-user", getIdUserByEmail);

export default router;
