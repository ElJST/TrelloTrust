import { db } from "../connection-bbdd/connection.js";

export const getCards = async () => {
  const [rows] = await db.query("SELECT * FROM cards");
  return rows;
};

export const insertCards = async (board_id, title, column_name) => {
  const [rows] = await db.query(
    "INSERT INTO cards (board_id, title, column_name) VALUES (?, ?, ?)",
    [board_id, title, column_name]
  );
  return rows;
};

export const moveCards = async (id, column_name) => {
  const [rows] = await db.query(
    "UPDATE cards SET column_name = ? WHERE id = ?",
    [column_name, id]
  );
  return rows;
};

export const deleteCardModel = async (id) => {
  const [rows] = await db.query("DELETE FROM cards WHERE id = ?", [id]);
  return rows;
};
