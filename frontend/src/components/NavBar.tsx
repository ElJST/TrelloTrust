"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Button,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  type MenuItemsStage = {
    Inicio: string;
    "Que puedes hacer": string;
    "Como Hacerlo": string;
  };

  const menuItems: MenuItemsStage = {
    Inicio: "/",
    "Que puedes hacer": "/que-puedes-hacer",
    "Como Hacerlo": "/como-hacerlo",
  };
  // funcion para obtener el id del usuario activo 
  const getIdUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/get-id-user",
        {
          email: session?.user?.email,
        }
      );

      const userId = response.data.id;

      getBoardId(userId);
    } catch (error) {
      console.error("Error getIdUser:", error);
    }
  };
  // funcion para crear un nuevo tablero  
  const getBoardId = async (userId: number) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/boards/new-board",
        {
          user_id: userId,
          title: `Proyecto del usuario ${userId}`,
        }
      );

      const boardId = response.data.id;
      
      createNewCard(userId, boardId);

    } catch (error) {
      console.error("Error getBoardId:", error);
    }
  };
  // funcion para crear una tarjeta de ejemplo y redirigir al usuario al tablero creado
  // con el id del usuario y el id del tablero  
  const createNewCard = async (idUser: number, idBoard: number) => {
    try {
      const response = await axios.post("http://localhost:5000/api/cards/add-card", {
        board_id: idBoard,
        title: "Tarea de ejemplo",
        column_name: "todo",
      });

      router.push(`/user/${idUser}/board/${idBoard}`);
    } catch (error) {
      console.error("Error createNewCard:", error);
    }
  }

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">TRUST</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {Object.entries(menuItems).map(([label, path], index) => (
          <NavbarItem key={index}>
            <Link
              className={`w-full ${
                pathName === path
                  ? "text-[#006FEE] font-semibold"
                  : "text-foreground"
              }`}
              href={path}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {status === "loading" ? null : session?.user ? (
            <section className="flex">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    className="transition-transform"
                    name={session.user.name}
                  />
                </DropdownTrigger>
                <DropdownMenu variant="shadow">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-bold">Correo</p>
                    <p className="font-bold">{session.user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings" color="primary">
                    <button onClick={getIdUser}>Nuevo proyecto</button>
                  </DropdownItem>
                  <DropdownItem key="team_settings" color="primary">
                    <Link href={'/boards/list'}>Editar proyecto</Link>
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    as="button"
                    onPress={() => {
                      signOut({
                        callbackUrl: "/",
                      });
                    }}
                  >
                    Cerrar Sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </section>
          ) : (
            <Button color="primary" radius="full" variant="shadow">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {Object.entries(menuItems).map(([label, path], index) => (
          <NavbarMenuItem key={index}>
            <Link
              className={`w-full ${
                pathName === path
                  ? "text-[#006FEE] font-semibold"
                  : "text-foreground"
              }`}
              href={path}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
