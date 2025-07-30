import { db } from "../connection-bbdd/connection.js";

export const queryInsertBoard = async (user_id, title) => {
  const [rows] = await db.query(
    "INSERT INTO boards (user_id, title) VALUES (?, ?)",
    [user_id, title]
  );
  return rows;
};
