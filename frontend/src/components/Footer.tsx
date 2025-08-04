import Link from "next/link";
import { FaLinkedin, FaTiktok } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer
      className="
    text-white py-8 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">We Do Websites</h2>
          <p className="text-gray-400">
            Creamos páginas web personalizadas, rápidas y optimizadas para tu
            negocio.
          </p>
          <a
            href="https://www.wdwebsites.com"
            target="_blank"
            className="text-gray-400 hover:text-white mt-2 flex items-center gap-2"
          >
            WE DO WEBSITES <FaExternalLinkAlt />
          </a>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Enlaces</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link href="/que-puedes-hacer" className="hover:text-white">
                ¿Que puedes hacer?
              </Link>
            </li>
            <li>
              <Link href="/como-hacerlo" className="hover:text-white">
                ¿Como hacerlo?
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contacto</h3>
          <p className="text-gray-400 mb-2">
            Email: contactwdwebsites@gmail.com
          </p>
          <p className="text-gray-400 mb-2">Telefono: +34 643 843 310</p>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.tiktok.com/@wdwebsites?lang=es"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <FaTiktok size={25} />
            </a>
            <a
              href="https://www.instagram.com/wdwebsites/"
              target="_blank"
              className="text-gray-400 hover:text-white"
            >
              <IoLogoInstagram size={25} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Mis perfiles</h3>
          <ul className="text-gray-400">
            <li className="space-y-2">
              <a
                href="https://www.linkedin.com/in/justin-campuzano-n-5bbb182a3/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-2"
              >
                Perfil en Linkedin <FaLinkedin size={25} />
              </a>
              <a
                href="https://github.com/ElJST"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white flex items-center gap-2"
              >
                Perfil en Github<FaGithub size={25} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        &copy; 2025 We Do Websites. Todos los derechos reservados.
      </div>
    </footer>
  );
};
