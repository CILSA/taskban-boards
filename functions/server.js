// boards.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import {
  fetchBoards,
  fetchBoardById,
  addBoard,
  updateBoardById,  // Importar la función de actualización
  deleteBoardById   // Importar la función de eliminación
} from "./controllers/controller";

const app = express();
app.use(cors());
app.use(express.json());
const router = express.Router();

router.get("/boards", fetchBoards); // Obtener todos los boards o filtrar por ID
router.get("/boards/:id", fetchBoardById); // Obtener un board específico
router.post("/boards", addBoard); // Crear un nuevo board
router.put("/boards/:id", updateBoardById);
router.delete("/boards/:id", deleteBoardById);

app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
