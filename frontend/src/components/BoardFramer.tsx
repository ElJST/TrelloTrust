"use client";
import  Board  from "./board/Board";
import React, { useState, useEffect } from "react";
import { CardType } from "./board/types";

export default function CustomKanban() {
  const [cards, setCards] = useState<CardType[]>([]);

  // fetch global para cargar las cards
  const fetchCards = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cards/all-cards");
      const data = await res.json();

      setCards(
        data.map((card: any) => ({
          id: card.id,
          title: card.title,
          column: card.column_name,
        }))
      );
    } catch (err) {
      console.error("❌ Error fetching cards:", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <div className="h-screen w-full text-neutral-50">
      <Board cards={cards} setCards={setCards} fetchCards={fetchCards} />
    </div>
  );
}
