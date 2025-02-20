import { openDB } from "idb";

export const initDB = async () => {
    const db = await openDB("quizDB", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains("history")) {
                const store = db.createObjectStore("history", {
                    keyPath: "id",
                    autoIncrement: true,
                });
                store.createIndex("date", "date");
            }
        },
    });
    return db;
};

export const saveQuizAttempt = async ({ score, date }) => {
    const db = await initDB();
    const tx = db.transaction("history", "readwrite");
    const store = tx.objectStore("history");
    store.add({ score, date });
    await tx.done;
};

export const getQuizHistory = async () => {
    const db = await initDB();
    const tx = db.transaction("history", "readonly");
    const store = tx.objectStore("history");
    const allHistory = await store.getAll();
    return allHistory;
};
