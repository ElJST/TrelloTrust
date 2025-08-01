"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function ListBoardsPage() {
  type Board = {
    id: number;
    title: string;
  };
  const [boards, setBoards] = useState<Board[]>([]);
  const { data: session } = useSession();

  const getIdUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/get-id-user",
        {
          email: session?.user?.email,
        }
      );

      const userId = response.data.id;

      fetchListBoards(userId);
    } catch (error) {
      console.error("Error getIdUser:", error);
    }
  };

  const fetchListBoards = async (id: number) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/boards/get-boards",
        {
          user_id: id,
        }
      );
      const ids = response;
      console.log("list boards:", ids.data);
      setBoards(response.data);
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
    <div className="min-h-screen flex items-center justify-center">
      <h2>edit mode</h2>

    </div>
  );
}
