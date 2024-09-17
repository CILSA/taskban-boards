import { getBoards, getBoardById, createBoard } from "../models/model.js";

export const fetchBoards = async (req, res) => {
    try {
        const boards = await getBoards();
        res.json(boards);
    } catch (error) {
        console.error("Error fetching boards:", error);
        res.status(500).json({ message: "Error fetching boards" });
    }
};

export const fetchBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const board = await getBoardById(parseInt(id, 10));
        if (!board) {
            return res.status(404).json({ message: "Board not found" });
        }
        res.json(board);
    } catch (error) {
        console.error("Error fetching board:", error);
        res.status(500).json({ message: "Error fetching board" });
    }
};

export const addBoard = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required" });
    }

    try {
        const boardId = await createBoard(req.body);
        res.status(201).json({ message: "Board created", boardId });
    } catch (error) {
        console.error("Error creating board:", error);
        res.status(500).json({ message: "Error creating board" });
    }
};
