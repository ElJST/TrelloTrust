import { db } from "../connection-bbdd/connection.js";

export const getUserByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT id, username, email, password FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};

export const insertUser = async ({ username, email, password }) => {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return result;
};
