
"use client";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/BoardFramer"), { ssr: false });

export default function BoardPage() {
  return <Board />;
}