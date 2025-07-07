import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUserController,
  deleteUserController
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
