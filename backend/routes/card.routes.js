import express from "express";
import {
  getAllCards,
  postCards,
  updateCardColumn,
  deleteCard
} from "../controllers/card.controller.js";

const router = express.Router();

router.get("/all-cards", getAllCards);
router.post("/add-card", postCards);
router.patch("/update-card", updateCardColumn);
router.delete("/delete-card/:id", deleteCard);

export default router;
