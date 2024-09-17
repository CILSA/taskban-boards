import express from "express";
import { fetchBoards, fetchBoardById, addBoard } from "../controllers/controller";

const router = express.Router();

router.get("/boards", fetchBoards); // Obtener todos los boards o filtrar por ID
router.get("/boards/:id", fetchBoardById); // Obtener un board específico
router.post("/boards", addBoard); // Crear un nuevo board

export default router;
