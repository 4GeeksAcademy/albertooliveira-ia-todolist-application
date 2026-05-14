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
                if (!resp.ok) throw new Error("Error");
                return resp.json();
            })
            .then(data => { if (data) setTasks(data.todos || []); })
            .catch(error => console.error(error))
            .finally(() => setLoading(false));
    };

    const createUser = () => {
        fetch(`${baseUrl}/users/${username}`, { method: "POST" }).then(() => getTasks());
    };

    useEffect(() => { getTasks(); }, []);

    const addTask = (newLabel) => {
        setLoading(true);
        fetch(`${baseUrl}/todos/${username}`, {
            method: "POST",
            body: JSON.stringify({ label: newLabel, is_done: false }),
            headers: { "Content-Type": "application/json" }
        })
        .then(resp => resp.ok ? resp.json() : null)
        .then(newTask => { if (newTask) setTasks([...tasks, newTask]); })
        .finally(() => setLoading(false));
    };

    const deleteTask = (id) => {
        setLoading(true);
        fetch(`${baseUrl}/todos/${id}`, { method: "DELETE" })
        .then(resp => { if (resp.ok) setTasks(tasks.filter(t => t.id !== id)); })
        .finally(() => setLoading(false));
    };

    const updateTask = (id, updatedData) => {
        setLoading(true);
        fetch(`${baseUrl}/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(updatedData),
            headers: { "Content-Type": "application/json" }
        })
        .then(resp => resp.ok ? resp.json() : null)
        .then(updatedTask => {
            if (updatedTask) setTasks(tasks.map(t => t.id === id ? updatedTask : t));
        })
        .finally(() => setLoading(false));
    };

    const clearAll = () => {
        setLoading(true);
        const deletePromises = tasks.map(t => fetch(`${baseUrl}/todos/${t.id}`, { method: "DELETE" }));
        Promise.all(deletePromises).then(() => setTasks([])).finally(() => setLoading(false));
    };

    return (
        <Home 
            tasks={tasks} 
            addTask={addTask} 
            deleteTask={deleteTask} 
            updateTask={updateTask}
            clearAll={clearAll} 
            loading={loading}
        />
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);