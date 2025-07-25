"use client";
import { useState, useEffect } from "react";
import { CardType } from "./types";
import { Column } from "./Column";
import { BurnBarrel } from "./BurnBarrel";

export const Board = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  const fetchCards = async () => {
    const res = await fetch("http://localhost:5000/api/cards/all-cards");
    const data = await res.json();
    setCards(
      data.map((card: any) => ({
        id: card.id,
        title: card.title,
        column: card.column_name,
      }))
    );
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="flex h-full w-full gap-3 overflow-auto p-12">
      <Column
        title="TODO"
        column="todo"
        headingColor="text-slate-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};
