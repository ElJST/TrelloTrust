import { queryInsertBoard } from "../models/board.model.js";

export const createBoard = async (req, res) => {
  try {
    const { user_id, title } = req.body;
    console.log(user_id, title);
    const result = await queryInsertBoard(user_id, title);
    console.log(result);
    res.status(201).json({ id: result.insertId, user_id, title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};