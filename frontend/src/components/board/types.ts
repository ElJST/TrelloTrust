export type ColumnType = "todo" | "doing" | "done";

export type CardType = {
  id: string;
  title: string;
  column: ColumnType;
};
