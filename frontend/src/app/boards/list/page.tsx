"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TableBoardType } from "@/types/types";
import TableBoards from "@/components/TableBoards";
import { Divider } from "@heroui/react";

export default function ListBoardsPage() {
  const [boards, setBoards] = useState<TableBoardType[]>([]);
  const [idUser, setIdUser] = useState<number>();
  const { data: session } = useSession();

  const getIdUser = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/get-id-user`,
        {
          email: session?.user?.email,
        }
      );

      setIdUser(response.data.id);

      fetchListBoards(response.data.id);
    } catch (error) {
      console.error("Error getIdUser:", error);
    }
  };

  const fetchListBoards = async (id: number) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-boards`,
        {
          user_id: id,
        }
      );
      setBoards(response.data.result);
    } catch (error) {
      console.error("Error getBoards:", error);
    }
  };
  
  useEffect(() => {
    if (session?.user?.email) {
      getIdUser();
    }
  }, [session]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <TableBoards boards={boards} setBoards={setBoards} userId={idUser} />
      <Divider className="my-4 w-3/4" />
    </div>
  );
}
