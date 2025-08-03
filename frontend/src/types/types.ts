export type ColumnType = "todo" | "doing" | "done";

export type CardType = {
  id?: number; // id ahora es opcional y tipo number
  title: string;
  column: ColumnType;
};

export type TableBoardType = {
  id: number;
  title: string;
};
