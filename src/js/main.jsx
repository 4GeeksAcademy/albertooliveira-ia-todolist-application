import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import "../styles/index.css"; 
import Home from "./components/Home.jsx";

const MainApp = () => {
    const [tasks, setTasks] = useState([]);
    
    const username = "alberto_user"; 
    const apiUrl = `https://playground.4geeks.com/todo/users/${username}`;

    const getTasks = () => {
        fetch(apiUrl)
            .then(resp => {
                if (resp.status === 404) {
                    throw new Error("Usuario no encontrado. Asegúrate de crearlo primero.");
                }
                if (!resp.ok) throw new Error("Error al cargar las tareas");
                return resp.json();
            })
            .then(data => {
                setTasks(data.todos || []);
            })
            .catch(error => console.error("Error inicial:", error));
    };

    useEffect(() => {
        getTasks();
    }, []);

    const syncWithServer = (updatedList) => {
        fetch(apiUrl, {
            method: "PUT",
            body: JSON.stringify(updatedList),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => {
            if (!resp.ok) throw new Error("No se pudo sincronizar con el servidor");
            return resp.json();
        })
        .then(() => {
            setTasks(updatedList);
        })
        .catch(error => console.error("Error de sincronización:", error));
    };
    
    const addTask = (newLabel) => {
        const newTask = { label: newLabel, is_done: false };
        const newList = [...tasks, newTask];
        syncWithServer(newList);
    };

    const deleteTask = (indexToDelete) => {
        const newList = tasks.filter((_, index) => index !== indexToDelete);
        syncWithServer(newList);
    };

    const clearAll = () => {
        syncWithServer([]);
    };

    return (
        <div className="main-wrapper">
            <Home 
                tasks={tasks} 
                addTask={addTask} 
                deleteTask={deleteTask} 
                clearAll={clearAll} 
            />
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);