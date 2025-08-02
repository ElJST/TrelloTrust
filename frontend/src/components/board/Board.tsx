import React, { Dispatch, SetStateAction } from "react";
import { Column } from "@/components/board/Column";
import { BurnBarrel } from "@/components/board/BurnBarrel";
import { CardType } from "../../types/types";

type BoardProps = {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  fetchCards: () => Promise<void>;
};

export default function Board({ cards, setCards, fetchCards }: BoardProps) {
  return (
    <div className="flex h-full w-full gap-3 overflow-auto p-12">
      <Column
        title="TODO"
        column="todo"
        headingColor="text-slate-200"
        cards={cards}
        setCards={setCards}
        fetchCards={fetchCards}
      />
      <Column
        title="In progress"
        column="doing"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
        fetchCards={fetchCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
        fetchCards={fetchCards}
      />
      <BurnBarrel setCards={setCards} fetchCards={fetchCards} />
    </div>
  );
}
