import { db } from "../connection-bbdd/connection.js";

export const queryInsertBoard = async (user_id, title) => {
  const [rows] = await db.query(
    "INSERT INTO boards (user_id, title) VALUES (?, ?)",
    [user_id, title]
  );
  return rows;
};

export const queryGetBoardsByUser = async (id) => {
  const [rows] = await db.query(
    "SELECT id, title FROM boards WHERE user_id = ?",
    [id]
  );
  return rows;
};

export const queryGetBoardsById = async (id) => {
  const [rows] = await db.query(
    "SELECT id, title FROM boards WHERE id = ?",
    [id]
  );
  return rows;
};
