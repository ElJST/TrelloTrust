"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const ListMenuNav = () => {
  const pathname = usePathname();

  type navItem = {
    label: string;
    href: string;
  };

  const navItems: navItem[] = [
    { label: "Inicio", href: "/" },
    { label: "¿Que puedes hacer?", href: "/que-puedes-hacer" },
    { label: "Como hacerlo?", href: "/como-hacerlo" },
  ];

  return (
    <ul className="flex gap-10">
      {navItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={cn(
                "hover:underline",
                pathname === item.href ? "text-blue-600 font-bold" : ""
              )}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
