// Importa Firebase y Firestore
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, addDoc } from "firebase/firestore";

// Configura Firebase (usa tu propia configuración obtenida de Firebase Console)
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

// Obtener todos los boards
export const getBoards = async () => {
    const boardsCollection = collection(db, 'boards');
    const boardsSnapshot = await getDocs(boardsCollection);
    const boardsList = boardsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    return boardsList;
};

// Obtener un board por su ID
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

// Crear un nuevo board
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

