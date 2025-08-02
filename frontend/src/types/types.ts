export type ColumnType = "todo" | "doing" | "done";

export type CardType = {
  id: string;
  title: string;
  column: ColumnType;
};

export type TableBoardType = {
  id: number;
  title: string;
};
