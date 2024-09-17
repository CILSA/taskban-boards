import { getFirestore, collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCx8GI5km0guJojFuOb9KDKNSclqFQBhLI",
    authDomain: "taskban-v1.firebaseapp.com",
    projectId: "taskban-v1",
    storageBucket: "taskban-v1.appspot.com",
    messagingSenderId: "774075443466",
    appId: "1:774075443466:web:0b1ccf90595264ef8872f3",
    measurementId: "G-1MCX6F9W86"
};

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener todos los tableros
export const getBoards = async () => {
    const boardsCollection = collection(db, 'boards');
    const boardsSnapshot = await getDocs(boardsCollection);
    const boardsList = boardsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
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

// Crear un nuevo tablero con columnas
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

// Actualizar un tablero por su ID
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
