import {
  insertUser,
  getUserByEmail,
  findUserIdByEmail,
} from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = (await getUserByEmail(email)) || 0;

    if (existing != 0) {
      return res.status(409).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await insertUser({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ id: result.insertId, username, email });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getIdUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const existing = (await findUserIdByEmail(email)) || 0;

    res.status(201).json({ id: existing.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) return res.status(401).json({ message: "Email not found" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Incorrect password" });

    res.json({
      id: user.id,
      name: user.username,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
