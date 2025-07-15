import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT_SERVER || 5000;

app.use(cors());
app.use(express.json());

//rutas para los usuarios
app.use("/api/users", userRoutes);

//middleware (pendiente)

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
