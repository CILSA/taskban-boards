import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4004;

// Usa las rutas para boards
app.use('/api', routes);

// Servidor local para tableros (boards)
app.listen(port, () => {
    console.log(`Boards Service is running on http://localhost:${port}`);
});
