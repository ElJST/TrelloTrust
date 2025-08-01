import {
  queryInsertBoard,
  queryGetBoardsByUser,
} from "../models/board.model.js";

export const createBoard = async (req, res) => {
  try {
    const { user_id, title } = req.body;

    const result = await queryInsertBoard(user_id, title);

    res.status(201).json({ id: result.insertId, user_id, title });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllBoards = async (req, res) => {
  try {
    const { user_id } = req.body;

    const result = await queryGetBoardsByUser(user_id);

    res.status(201).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
