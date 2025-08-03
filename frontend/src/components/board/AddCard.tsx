"use client";
import { useState, FormEvent, Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { CardType, ColumnType } from "../../types/types";
import { useParams } from "next/navigation";
import axios from "axios";

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

export const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const { boardId } = useParams();

  const fetchCards = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cards/get-card`,
        {
          board_id: boardId,
        }
      );
      const cards = res.data.map((card: any) => ({
        ...card,
        column: card.column_name,
      }));
      setCards(cards);
    } catch (err) {
      console.error("❌ Error fetching cards:", err);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim().length) return;

    const backendCard = {
      board_id: boardId, 
      title: text.trim(),
      column_name: column, 
    };

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cards/add-card`,
      backendCard
    );
    fetchCards()

    setAdding(false);
    setText("");
  };

  return adding ? (
    <motion.form layout onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setText(e.target.value)}
        autoFocus
        placeholder="Add new task..."
        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
      />
      <div className="mt-1.5 flex items-center justify-end gap-1.5">
        <button
          onClick={() => setAdding(false)}
          className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-50"
        >
          Close
        </button>
        <button
          type="submit"
          className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 hover:bg-neutral-300"
        >
          <span>Add</span>
          <FiPlus />
        </button>
      </div>
    </motion.form>
  ) : (
    <motion.button
      layout
      onClick={() => setAdding(true)}
      className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-50"
    >
      <span>Add card</span>
      <FiPlus />
    </motion.button>
  );
};
