// boards.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";
import express from "express";
import { fetchBoards, fetchBoardById, addBoard } from "./controllers/controller.js";

const app = express();
app.use(cors());
const router = express.Router();

router.get("/boards", fetchBoards); // Obtener todos los boards o filtrar por ID
router.get("/boards/:id", fetchBoardById); // Obtener un board específico
router.post("/boards", addBoard); // Crear un nuevo board



app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
