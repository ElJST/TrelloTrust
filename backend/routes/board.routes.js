import express from "express";
import {
  createBoard,
  getAllBoards,
  getOneBoards,
  updateTitleBoard,
  deleteRowBoard
} from "../controllers/board.controller.js";

const router = express.Router();

router.post("/new-board", createBoard);
router.post("/get-boards", getAllBoards);
router.post("/get-one-board", getOneBoards);
router.post("/update-title-board", updateTitleBoard);
router.post("/delete-board", deleteRowBoard);

export default router;
