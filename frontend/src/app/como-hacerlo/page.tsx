import Link from "next/link"

export default function HowDoIt() {
  return (
    <section className="min-h-screen px-6 py-12 bg-white text-black">
      <h2 className="text-3xl font-bold mb-6">¿Cómo hacerlo?</h2>

      <div className="space-y-8 text-lg leading-relaxed">
        <div>
          <h3 className="text-2xl font-semibold mb-2">1. Crear un tablero</h3>
          <p>
            Dirígete al panel principal y pulsa en el botón <strong>“Crear nuevo tablero”</strong>. Ingresa un nombre para tu tablero y selecciónalo para comenzar a trabajar.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">2. Añadir columnas</h3>
          <p>
            Dentro del tablero, haz clic en <strong>“Agregar columna”</strong> para añadir secciones como “Por hacer”, “En progreso” o “Completado”. Puedes personalizar el título de cada una.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">3. Crear tareas</h3>
          <p>
            En cualquier columna, pulsa el botón <strong>“+ Añadir tarea”</strong>. Escribe un título, descripción y otros detalles relevantes. Luego haz clic en “Guardar”.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">4. Mover tareas</h3>
          <p>
            Arrastra y suelta las tareas entre columnas para cambiar su estado. El sistema guardará automáticamente la nueva posición.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">5. Editar o eliminar tareas</h3>
          <p>
            Haz clic en cualquier tarea para ver los detalles. Allí podrás <strong>editar</strong> la información o <strong>eliminarla</strong> si ya no es necesaria.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-2">6. Guardado automático</h3>
          <p>
            Cada cambio que hagas se guarda automáticamente, por lo que no necesitas preocuparte por perder tu progreso.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-2">Pre. Iniciar sesión</h3>
          <p>
            Para poder crear y acceder a tus paneles primero tendras que <Link href={"/register"} className="text-blue-500"><strong>Registrarte</strong></Link> y luego <Link href={"/login"} className="text-blue-500"><strong>Iniciar Sesión</strong></Link>, ahora solo queda disfrutar organizandote.
          </p>
        </div>
      </div>
    </section>
  );
}
