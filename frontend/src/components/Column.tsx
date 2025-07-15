import UserCard from "./UserCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
type UserType = { id: string; name: string };
type ColumnsType = {
  todo: UserType[];
  doing: UserType[];
  done: UserType[];
};

export default function Column({
  id,
  title,
  users,
}: {
  id: keyof ColumnsType;
  title: string;
  users: UserType[];
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className="w-1/3 p-4 bg-gray-100 rounded min-h-[300px]"
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <SortableContext items={users} strategy={verticalListSortingStrategy}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </SortableContext>
    </div>
  );
}
