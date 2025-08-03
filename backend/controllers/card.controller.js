import {
  getCards,
  insertCards,
  moveCards,
  deleteCardModel,
  updateCardOrden,
} from "../models/card.model.js";

export const getCard = async (req, res) => {
  try {
    const { board_id } = req.body;
    const cards = await getCards(board_id);
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const postCards = async (req, res) => {
  try {
    const { board_id, title, column_name } = req.body;
    const cards = await insertCards(board_id, title, column_name);
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCardColumn = async (req, res) => {
  try {
    const { id, column_name } = req.body;

    const result = await moveCards(id, column_name);

    res.status(200).json({ message: "Card actualizada", result });
  } catch (err) {
    console.error("❌ Error en updateCardColumn:", err);
    res.status(500).json({ error: err.message });
  }
};

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteCardModel(id);
    res.status(200).json({
      message: "Card eliminada correctamente",
      result,
    });
  } catch (err) {
    console.error("Error eliminando card:", err);
    res.status(500).json({ error: err.message });
  }
};

export const updateCardOrders = async (req, res) => {
  const cards = req.body;

  if (!Array.isArray(cards)) {
    return res.status(400).json({ message: "Cards array is required" });
  }
  try {
    for (let i = 0; i < cards.length; i++) {
      const { id, column_name } = cards[i];
      updateCardOrden(i, id, column_name);
    }

    res.status(200).json({ message: "Card orders updated successfully" });
  } catch (err) {
    console.error("❌ Error updating card orders:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
