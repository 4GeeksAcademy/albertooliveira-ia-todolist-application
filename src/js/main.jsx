import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css"; 
import Home from "./components/Home.jsx";

const MainApp = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const username = "alberto_user"; 
    const baseUrl = `https://playground.4geeks.com/todo`;

    const getTasks = () => {
        setLoading(true);
        fetch(`${baseUrl}/users/${username}`)
            .then(resp => {
                if (resp.status === 404) return createUser();
                if (!resp.ok) throw new Error("Error al cargar las tareas");
                return resp.json();
            })
            .then(data => {
                if (data && data.todos) setTasks(data.todos);
            })
            .catch(error => console.error("Error en GET:", error))
            .finally(() => setLoading(false));
    };

    const createUser = () => {
        return fetch(`${baseUrl}/users/${username}`, { method: "POST" })
            .then(resp => {
                if (!resp.ok) throw new Error("No se pudo crear el usuario");
                return getTasks();
            })
            .catch(error => console.error("Error creando usuario:", error));
    };

    useEffect(() => { 
        getTasks(); 
    }, []);

    const addTask = (newLabel) => {
        setLoading(true);
        fetch(`${baseUrl}/todos/${username}`, {
            method: "POST",
            body: JSON.stringify({ label: newLabel, is_done: false }),
            headers: { "Content-Type": "application/json" }
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Error al añadir tarea");
            return resp.json();
        })
        .then(newTask => {
            if (newTask) setTasks([...tasks, newTask]);
        })
        .catch(error => console.error("Error en POST:", error))
        .finally(() => setLoading(false));
    };

    const deleteTask = (id) => {
        setLoading(true);
        fetch(`${baseUrl}/todos/${id}`, { method: "DELETE" })
        .then(resp => {
            if (!resp.ok) throw new Error("Error al borrar la tarea");
            setTasks(tasks.filter(t => t.id !== id));
        })
        .catch(error => console.error("Error en DELETE:", error))
        .finally(() => setLoading(false));
    };

    const toggleTask = (task) => {
        setLoading(true);
        fetch(`${baseUrl}/todos/${task.id}`, {
            method: "PUT",
            body: JSON.stringify({ 
                label: task.label, 
                is_done: !task.is_done 
            }),
            headers: { "Content-Type": "application/json" }
        })
        .then(resp => {
            if (!resp.ok) throw new Error("Error al actualizar tarea");
            return resp.json();
        })
        .then(updatedTask => {
            if (updatedTask) {
                setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
            }
        })
        .catch(error => console.error("Error en PUT:", error))
        .finally(() => setLoading(false));
    };

    const clearAll = () => {
        if (tasks.length === 0) return;
        setLoading(true);
        const promises = tasks.map(t => fetch(`${baseUrl}/todos/${t.id}`, { method: "DELETE" }));
        Promise.all(promises)
            .then(() => setTasks([]))
            .catch(error => console.error("Error al limpiar todo:", error))
            .finally(() => setLoading(false));
    };

    return (
        <Home 
            tasks={tasks} 
            addTask={addTask} 
            deleteTask={deleteTask} 
            toggleTask={toggleTask} 
            clearAll={clearAll} 
            loading={loading}
        />
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);