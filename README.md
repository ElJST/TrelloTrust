# Trello-Trust

**Trello-Trust** es una aplicación web inspirada en Trello que permite a los usuarios crear tableros, listas y tarjetas para gestionar tareas de manera visual e intuitiva.

## 🧩 Tecnologías utilizadas

- **Frontend:** Next.js, TypeScript, TailwindCSS
- **Backend:** Node.js + Express
- **Base de datos:** MySQL (mediante Docker Compose)
- **Docker:** Docker Compose

---

## 📦 Estructura del proyecto

```
Trello-Trust/
├── backend/             # API REST con Express
├── frontend/            # Interfaz de usuario con Next.js
├── mysql_data/          # Persistencia de datos (cuando levantes el contenedor)
├── docker-compose.yml   # Configuración de servicios Docker
└── README.md
```

---

## 🚀 Instalación y ejecución

### Requisitos previos

- Node.js (>=18)
- Docker y Docker Compose

### 1. Clona el repositorio

```bash
git clone https://github.com/ElJST/TrelloTrust.git
cd TrelloTrust
```

### 2. Inicia los contenedores Docker

```bash
docker-compose up -d
```

Esto levantará un contenedor con MySQL accesible desde el backend.

### 3. Configura variables de entorno

#### Backend (`backend/.env`) (.env de ejemplo)

```
PORT=3306
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=123456
DB_NAME=trust

PORT_SERVER=5000
```

#### Frontend (`frontend/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Inicia el backend

```bash
cd backend
npm install
node server.js
```

### 5. Inicia el frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ✨ Funcionalidades

- Crear múltiples tableros
- Añadir listas dentro de tableros
- Crear y mover tarjetas entre listas (drag & drop)
- Guardar estado en la base de datos
- Vista adaptada para móviles

---

## 🔧 ¿Qué puedes hacer?

- Crear tableros para diferentes proyectos o equipos.
- Organizar tareas mediante tarjetas arrastrables.
- Editar nombres de listas y tarjetas.
- Eliminar tarjetas o listas.
- Guardar tus cambios automáticamente.

---

## 📘 Cómo usar la aplicación

1. **Crear tablero:** pulsa en "Nuevo Tablero".
2. **Añadir lista:** dentro de un tablero, usa "Añadir lista".
3. **Agregar tarjeta:** en cada lista, puedes escribir una nueva tarjeta.
4. **Mover tarjetas:** arrastra y suelta entre listas.
5. **Editar o eliminar:** haz clic en el nombre para editar o pulsa el icono de eliminar.

---

## 🐳 Servicios Docker

- `db`: Contenedor MySQL con volúmenes persistentes.
- Puedes acceder a la base de datos con herramientas como DBeaver, host: `localhost`, puerto: `3306`, user: `root`, password: `123456`.
