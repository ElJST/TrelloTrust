import React from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Textarea, Tooltip } from "@heroui/react";
import { MdEdit } from "react-icons/md";
import { TableBoardType as BoardType } from "@/types/types";
import { MdOutlineSaveAlt } from "react-icons/md";

export default function EditTitleBoard() {
  const { boardId } = useParams();
  const [board, setBoard] = React.useState<BoardType[]>([]);
  const [disabled, setDisabled] = React.useState<boolean>(true);
  const [value, setValue] = React.useState<string>();

  const fetchListBoards = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-one-board`,
        {
          id: boardId,
        }
      );
      setBoard(response.data.result);
    } catch (error) {
      console.error("Error getBoards:", error);
    }
  };

  const updateTitle = async () => {
    if (!value || !boardId) return;
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/update-title-board`,
        {
          id: boardId,
          title: value,
        }
      );

      setDisabled(true);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  React.useEffect(() => {
    fetchListBoards();
  }, []);

  React.useEffect(() => {
    if (board.length > 0) {
      setValue(board[0].title);
    }
  }, [board]);

  return (
    <section className="flex items-center px-12 mt-6 gap-6">
      {board[0] && (
        <Textarea
          disabled={disabled}
          className="max-w-xs"
          value={value}
          onValueChange={setValue}
          label="Título:"
          labelPlacement="outside-left"
          variant="underlined"
          maxRows={1}
          size="lg"
        />
      )}

      {disabled ? (
        <Tooltip content="Editar titulo">
          <MdEdit
            className="cursor-pointer"
            onClick={() => setDisabled(!disabled)}
            size={25}
          />
        </Tooltip>
      ) : (
        <Tooltip content="Guardar titulo">
          <MdOutlineSaveAlt
            className="cursor-pointer"
            onClick={updateTitle}
            size={25}
          />
        </Tooltip>
      )}
    </section>
  );
}
