import { db } from "../connection-bbdd/connection.js";

export const getAllUsers = async () => {
  const [rows] = await db.query("SELECT id, username, email, created_at FROM users");
  return rows;
};

export const getUserById = async (id) => {
  const [rows] = await db.query("SELECT id, username, email, created_at FROM users WHERE id = ?", [id]);
  return rows[0];
};

export const insertUser = async ({ username, email, password }) => {
  const [result] = await db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password]
  );
  return result;
};

export const updateUser = async (id, { username, email }) => {
  const [result] = await db.query(
    "UPDATE users SET username = ?, email = ? WHERE id = ?",
    [username, email, id]
  );
  return result;
};

export const deleteUser = async (id) => {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result;
};
