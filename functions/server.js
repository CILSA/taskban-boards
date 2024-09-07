// boards.js
import express from "express";
import cors from "cors";
import serverless from "serverless-http";

const app = express();
app.use(cors());

const router = express.Router();

// Mock data para boards
const boards = [
  { id: 1, name: "Board 1", description: "Description for Board 1" },
  { id: 2, name: "Board 2", description: "Description for Board 2" },
  { id: 3, name: "Board 3", description: "Description for Board 3" },
];

// Ruta para obtener todos los boards
router.get("/boards", (req, res) => {
  res.json(boards);
});

// Ruta para obtener un board por ID
router.get("/boards/:id", (req, res) => {
  const { id } = req.params;
  const board = boards.find((b) => b.id === Number(id));

  if (board) {
    res.json(board);
  } else {
    res.status(404).json({ message: "Board not found" });
  }
});

// Iniciar servidor en el contexto de Netlify Functions
app.use('/.netlify/functions/server', router);

export const handler = serverless(app);
