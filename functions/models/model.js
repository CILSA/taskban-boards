import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_API_KEY,
    authDomain: process.env.VITE_AUTH_DOMAIN,
    projectId: process.env.VITE_PROJECT_ID,
    storageBucket: process.env.VITE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_APP_ID,
    measurementId: process.env.VITE_MEASUREMENT_ID,
};


// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener todos los tableros filtrando por teamId
export const getBoards = async (teamId) => {
    const boardsCollection = collection(db, 'boards');
    const boardsSnapshot = await getDocs(boardsCollection);
    const boardsList = boardsSnapshot.docs
        .map(doc => ({
            id: doc.id,
            ...doc.data(),
        }))
        .filter(board => board.teamId === teamId); // Filtrar por teamId
    return boardsList;
};

// Obtener un tablero por su ID
export const getBoardById = async (id) => {
    const boardRef = doc(db, 'boards', id);
    const boardSnapshot = await getDoc(boardRef);
    if (boardSnapshot.exists()) {
        return { id: boardSnapshot.id, ...boardSnapshot.data() };
    } else {
        console.log("No se encontró el board con ese ID");
        return null;
    }
};

// Crear un nuevo tablero con columnas y teamId
export const createBoard = async (board) => {
    try {
        const boardsCollection = collection(db, 'boards');
        const docRef = await addDoc(boardsCollection, board);
        return docRef.id; // Devuelve el ID generado por Firestore
    } catch (error) {
        console.error("Error al crear el board:", error);
        throw error;
    }
};

// Actualizar un tablero por su ID (incluye teamId)
export const updateBoard = async (id, boardData) => {
    const boardRef = doc(db, 'boards', id);
    try {
        await updateDoc(boardRef, boardData);
        return { id, ...boardData };
    } catch (error) {
        console.error("Error al actualizar el board:", error);
        throw error;
    }
};


// Eliminar un tablero por su ID
export const deleteBoard = async (id) => {
    const boardRef = doc(db, 'boards', id);
    try {
        await deleteDoc(boardRef);
        return true;
    } catch (error) {
        console.error("Error al eliminar el board:", error);
        return false;
    }
};
