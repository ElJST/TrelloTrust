import Image from "next/image";
import boardImg from "../../public/boardImg.png";
import Link from "next/link";

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Bienvenido a Trello Trust
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Esta es tu herramienta de organización personal basada en tableros
          Kanban. Organiza tus tareas por columnas, arrastra tarjetas y mantén
          el control de tus proyectos fácilmente.
        </p>
        <Image
          src={boardImg}
          alt="Imagen de ejemplo sobre Tablero"
          width={800}
          className="mx-auto rounded-lg shadow-lg"
        />
        
      </div>
    </section>
  );
}
