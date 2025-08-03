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
  const [rows] = await db.query("SELECT id, title FROM boards WHERE id = ?", [
    id,
  ]);
  return rows;
};

export const queryUpdateTitle = async ( title ,id ) => {
  const [rows] = await db.query("UPDATE boards SET title = ? WHERE id = ?", [
    title,
    id,
  ]);
  return rows;
};

export const queryDeleteBoard = async ( id ) => {
  const [rows] = await db.query("DELETE FROM boards WHERE id = ?", [
    id,
  ]);
  return rows;
};
