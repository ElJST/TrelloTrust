import express from "express"

const app = express(); 
const port = process.env.PORT_SERVER || 5000;



app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});
