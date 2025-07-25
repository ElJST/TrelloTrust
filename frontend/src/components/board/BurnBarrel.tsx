"use client";
import { Dispatch, SetStateAction, useState, DragEvent } from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import { CardType } from "./types";

export const BurnBarrel = ({
  setCards,
  fetchCards
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
  fetchCards: () => void;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDrop = async(e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((prev) => prev.filter((c) => c.id !== cardId));
    await deleteCardFromDB(cardId);
    await fetchCards()
    setActive(false);
  };

  const deleteCardFromDB = async (cardId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cards/delete-card/${cardId}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        console.error("❌ Error eliminando en backend:", errorText);
      } else {
        console.log("✅ Card eliminada en backend:", cardId);
      }
    } catch (error) {
      console.error("❌ Error de conexión al backend:", error);
    }
  };
  

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};
