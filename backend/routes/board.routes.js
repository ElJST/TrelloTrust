import express from "express";
import {
  createBoard,
  getAllBoards,
  getOneBoards
} from "../controllers/board.controller.js";

const router = express.Router();

router.post("/new-board", createBoard);
router.post("/get-boards", getAllBoards);
router.post("/get-one-board", getOneBoards);

export default router;
