import express from "express";
import {
  createBoard,
  getAllBoards
} from "../controllers/board.controller.js";

const router = express.Router();

router.post("/new-board", createBoard);
router.post("/get-boards", getAllBoards);

export default router;
