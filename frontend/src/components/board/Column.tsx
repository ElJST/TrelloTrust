"use client";
import { useState, DragEvent, Dispatch, SetStateAction } from "react";
import { CardType, ColumnType } from "../../types/types";
import { Card } from "./Card";
import { DropIndicator } from "./DropIndicator";
import { AddCard } from "./AddCard";
import { clearHighlights, getNearestIndicator } from "@/lib/utils";

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  fetchCards: () => Promise<void>;
};

export const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  fetchCards
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const getIndicators = () =>
    Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );

  const handleDragStart = (e: DragEvent, card: CardType) => {
    // Si el id no existe, no se puede arrastrar
    if (typeof card.id === "undefined") return;
    e.dataTransfer.setData("cardId", String(card.id));
  };

  const handleDragEnd = async (e: DragEvent) => {
    const cardIdStr = e.dataTransfer.getData("cardId");
    const cardId = Number(cardIdStr);

    setActive(false);
    clearHighlights(getIndicators());

    const { element } = getNearestIndicator(e.nativeEvent, getIndicators());
    const beforeStr = element.dataset.before || "-1";
    const before = Number(beforeStr);

    if (before !== cardId) {
      setCards((prev) => {
        let cardsCopy = [...prev];

        // 1️⃣ Sacar la tarjeta original
        const cardIndex = cardsCopy.findIndex((c) => c.id === cardId);
        if (cardIndex === -1) return prev;

        const [cardToTransfer] = cardsCopy.splice(cardIndex, 1);

        // 2️⃣ Actualizar su columna
        cardToTransfer.column = column;

        // 3️⃣ Si es mover al final
        if (before === -1) {
          cardsCopy.push(cardToTransfer);
        } else {
          // Buscar posición exacta donde insertarla
          const insertIndex = cardsCopy.findIndex((c) => c.id === before);
          if (insertIndex === -1) {
            cardsCopy.push(cardToTransfer);
          } else {
            cardsCopy.splice(insertIndex, 0, cardToTransfer);
          }
        }

        return cardsCopy;
      });

      // ✅ Actualizar backend
      try {
        await updateCardColumn(cardId, column);
      } catch (err) {
        console.error("❌ Error actualizando columna:", err);
      }
    }
  };

  const updateCardColumn = async (cardId: number, column_name: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/cards/update-card`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: cardId, column_name: column }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("❌ Error backend:", errText);
    }

    fetchCards();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    const indicators = getIndicators();
    clearHighlights(indicators);

    const { element } = getNearestIndicator(e.nativeEvent, indicators);
    element.style.opacity = "1";

    setActive(true);
  };

  const handleDragLeave = () => {
    clearHighlights(getIndicators());
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-56 shrink-0">
      <div className="mb-3">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => (
          <Card key={c.id} {...c} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};
