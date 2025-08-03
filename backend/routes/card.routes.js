import express from "express";
import {
  getCard,
  postCards,
  updateCardColumn,
  deleteCard,
  updateCardOrders
} from "../controllers/card.controller.js";

const router = express.Router();

router.post("/get-card", getCard);
router.post("/add-card", postCards);
router.patch("/update-card", updateCardColumn);
router.patch("/update-orders", updateCardOrders);
router.delete("/delete-card/:id", deleteCard);

export default router;
