"use client";
import Board from "./board/Board";
import React, { useState, useEffect } from "react";
import { CardType, TableBoardType as BoardType } from "../types/types";
import axios from "axios";
import { useParams } from "next/navigation";

export default function CustomKanban() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [board, setBoard] = useState<BoardType[]>([]);
  const { boardId } = useParams();

  const fetchListBoards = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-one-board`,
        {
          id: boardId,
        }
      );
      setBoard(response.data.result);
      console.log('boardsssss',boardId)
    } catch (error) {
      console.error("Error getBoards:", error);
    }
  };

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

  useEffect(() => {
    fetchCards();
    fetchListBoards();
  }, []);
  return (
    <div className="h-screen w-full text-neutral-50">
      <Board
        cards={cards}
        setCards={setCards}
        fetchCards={fetchCards}
        board={board}
      />
    </div>
  );
}
