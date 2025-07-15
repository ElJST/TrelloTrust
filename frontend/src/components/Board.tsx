"use client";
import { DndContext } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { useState } from "react";

import Column from "./Column";

type UserType = { id: string; name: string };

type ColumnsType = {
  todo: UserType[];
  doing: UserType[];
  done: UserType[];
};

export default function Board() {
  const [columns, setColumns] = useState<ColumnsType>({
    todo: [
      { id: "1", name: "John" },
      { id: "2", name: "Sarah" },
    ],
    doing: [{ id: "3", name: "Paul" }],
    done: [],
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // 🔹 Identificar en qué columna está el activo
    const fromColumn = (Object.keys(columns) as (keyof ColumnsType)[]).find(
      (key) => columns[key].some((user) => user.id === activeId)
    );

    // 🔹 Identificar en qué columna está el destino
    const overColumn =
      (Object.keys(columns) as (keyof ColumnsType)[]).find((key) =>
        columns[key].some((user) => user.id === overId)
      ) || (over.id as keyof ColumnsType); // Si soltamos en la columna misma

    if (!fromColumn || !overColumn) return;

    // ✅ Si está en la misma columna → solo reordenamos
    if (fromColumn === overColumn) {
      setColumns((prev) => {
        const columnItems = prev[fromColumn];
        const oldIndex = columnItems.findIndex((u) => u.id === activeId);
        const newIndex = columnItems.findIndex((u) => u.id === overId);

        return {
          ...prev,
          [fromColumn]: arrayMove(columnItems, oldIndex, newIndex),
        };
      });
      return;
    }

    // ✅ Si cambia de columna → moverlo
    const movedUser = columns[fromColumn].find((u) => u.id === activeId)!;

    setColumns((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((u) => u.id !== activeId),
      [overColumn]: [...prev[overColumn], movedUser],
    }));
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-4/6">
        <DndContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 text-black">
            <Column id="todo" title="Todo" users={columns.todo} />
            <Column id="doing" title="Doing" users={columns.doing} />
            <Column id="done" title="Done" users={columns.done} />
          </div>
        </DndContext>
      </div>
    </div>
  );
}
