// Obtener un tablero por su ID, incluyendo sus columnas
export const getBoardById = async (id) => {
    const boardRef = doc(db, 'boards', id);
    const boardSnapshot = await getDoc(boardRef);

    if (boardSnapshot.exists()) {
        const boardData = boardSnapshot.data();

        // Obtener las columnas del tablero desde una subcolección
        const columnsCollectionRef = collection(boardRef, 'columns');
        const columnsSnapshot = await getDocs(columnsCollectionRef);
        const columns = columnsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        // Incluir las columnas en la respuesta del tablero
        return {
            id: boardSnapshot.id,
            ...boardData,
            columns: columns || [], // Devuelve un array vacío si no hay columnas
        };
    } else {
        console.log("No se encontró el tablero con ese ID");
        return null;
    }
};

// Crear un tablero con columnas (opcional, si necesitas manejar columnas al crear un tablero)
export const createBoard = async (board, columns = []) => {
    try {
        const boardsCollection = collection(db, 'boards');
        const docRef = await addDoc(boardsCollection, board);

        // Si hay columnas, agregarlas a la subcolección
        if (columns.length > 0) {
            const columnsCollectionRef = collection(docRef, 'columns');
            for (const column of columns) {
                await addDoc(columnsCollectionRef, column);
            }
        }

        return docRef.id; // Devuelve el ID generado por Firestore
    } catch (error) {
        console.error("Error al crear el tablero:", error);
        throw error;
    }
};

// Actualizar un tablero por su ID, incluyendo las columnas
export const updateBoard = async (id, boardData, columns = []) => {
    const boardRef = doc(db, 'boards', id);
    try {
        // Actualizar los datos del tablero
        await updateDoc(boardRef, boardData);

        // Actualizar las columnas
        const columnsCollectionRef = collection(boardRef, 'columns');
        const columnsSnapshot = await getDocs(columnsCollectionRef);

        // Borrar las columnas anteriores
        const batch = db.batch();
        columnsSnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        // Agregar las nuevas columnas
        for (const column of columns) {
            await addDoc(columnsCollectionRef, column);
        }

        return { id, ...boardData, columns };
    } catch (error) {
        console.error("Error al actualizar el tablero:", error);
        throw error;
    }
};
