"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { TableBoardType } from "@/types/types";
import TableBoards from "@/components/TableBoards";
import { Divider } from "@heroui/react";

export default function ListBoardsPage() {
  const [boards, setBoards] = useState<TableBoardType[]>([]);
  const { data: session } = useSession();

  const getIdUser = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.157:5000/api/users/get-id-user",
        {
          email: session?.user?.email,
        }
      );

      fetchListBoards(response.data.id);
    } catch (error) {
      console.error("Error getIdUser:", error);
    }
  };

  const fetchListBoards = async (id: number) => {
    try {
      const response = await axios.post(
        "http://192.168.1.157:5000/api/boards/get-boards",
        {
          user_id: id,
        }
      );
      setBoards(response.data.result);
      debugger;
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
      <TableBoards boards={boards} setBoards={setBoards} />
      <Divider className="my-4 w-3/4" />
    </div>
  );
}
