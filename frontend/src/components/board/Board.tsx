import React, { Dispatch, SetStateAction } from "react";
import { Column } from "@/components/board/Column";
import { BurnBarrel } from "@/components/board/BurnBarrel";
import { CardType, TableBoardType as BoardType } from "../../types/types";

type BoardProps = {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  fetchCards: () => Promise<void>;
  board: BoardType[];
};

export default function Board({
  cards,
  setCards,
  fetchCards,
  board,
}: BoardProps) {
  return (
    <div>
      {board.map((item, index) => {
        return <h1 key={index} className="px-12 pt-6 font-semibold text-2xl">{item.title}</h1>;
      })}

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
    </div>
  );
}
