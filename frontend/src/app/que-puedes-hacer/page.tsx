export default function WhatUCanDo() {
  return (
    <section className="min-h-screen px-6 py-12 bg-gray-50 text-black">
      <h2 className="text-3xl font-bold mb-6 text-center">¿Qué puedes hacer?</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Crear tableros</h3>
          <p>Crea diferentes tableros para organizar tus proyectos, ideas o tareas por separado.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Añadir listas y columnas</h3>
          <p>Organiza tus tareas dentro de listas como "Por hacer", "En progreso" y "Hecho".</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Crear tarjetas</h3>
          <p>Añade tarjetas en cada columna para representar tareas o ideas individuales.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Arrastrar y soltar</h3>
          <p>Mueve tarjetas entre columnas fácilmente con función de "drag and drop".</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Editar tarjetas</h3>
          <p>Modifica el título y contenido de las tarjetas en cualquier momento.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Guardar cambios automáticamente</h3>
          <p>Todos los cambios se guardan automáticamente en la base de datos.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Modo responsivo</h3>
          <p>Accede a la aplicación desde tu móvil, tablet o escritorio sin perder funcionalidad.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">Iniciar sesión</h3>
          <p>Autentícate para acceder y gestionar tus tableros personalizados de forma segura.</p>
        </div>
      </div>
    </section>
  );
}
