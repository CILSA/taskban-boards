import { getBoards, getBoardById, createBoard, updateBoard, deleteBoard } from "../models/model";

// Obtener todos los tableros
export const fetchBoards = async (req, res) => {
    try {
        const boards = await getBoards();
        res.json(boards);
    } catch (error) {
        console.error("Error fetching boards:", error);
        res.status(500).json({ message: "Error fetching boards" });
    }
};

// Obtener un tablero por su ID
export const fetchBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const board = await getBoardById(id);
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(board);
    } catch (error) {
        console.error("Error fetching board:", error);
        res.status(500).json({ message: "Error fetching board" });
    }
};

// Crear un nuevo tablero con columnas
export const addBoard = async (req, res) => {
    const { name, description, columns } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    try {
        const boardId = await createBoard({ name, description, columns });
        res.status(201).json({ message: "Board created", boardId });
    } catch (error) {
        console.error("Error creating board:", error);
        res.status(500).json({ message: "Error creating board" });
    }
};

// Actualizar un tablero por su ID
export const updateBoardById = async (req, res) => {
    const { id } = req.params;
    const { name, description, columns } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    try {
        const updatedBoard = await updateBoard(id, { name, description, columns });
        if (!updatedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json({ message: "Board updated", board: updatedBoard });
    } catch (error) {
        console.error("Error updating board:", error);
        res.status(500).json({ message: "Error updating board" });
    }
};

// Eliminar un tablero por su ID
export const deleteBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await deleteBoard(id);
        if (!deleted) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json({ message: "Board deleted" });
    } catch (error) {
        console.error("Error deleting board:", error);
        res.status(500).json({ message: "Error deleting board" });
    }
};
