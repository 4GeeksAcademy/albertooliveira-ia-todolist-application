import React, { useState } from "react";
import PropTypes from "prop-types";

const Home = ({ tasks, addTask, deleteTask, toggleTask, updateTaskLabel, clearAll, loading }) => {
    const [inputValue, setInputValue] = useState("");
    const [editValue, setEditValue] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState(false);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (inputValue.trim().length < 3) {
                setError(true);
            } else {
                addTask(inputValue.trim());
                setInputValue(""); 
                setError(false);
            }
        }
    };

    const handleEditSave = (id) => {
        if (editValue.trim().length >= 3) {
            updateTaskLabel(id, editValue.trim());
            setEditingId(null);
        }
    };

    return (
        <div className="todo-container">
            <h1 className="todo-header">Tasks</h1>
            
            <div className="todo-card-body position-relative">
                {loading && (
                    <div className="spinner-overlay">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                )}

                <ul className="list-unstyled m-0 p-0">
                    <li className="input-row">
                        <input
                            type="text"
                            className="task-input-field"
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </li>
                    
                    {error && <li className="error-message">Minimum 3 characters required</li>}

                    {tasks.length === 0 ? (
                        <li className="empty-msg">No tasks, add a new task</li>
                    ) : (
                        tasks.map((task) => (
                            <li key={task.id} className="task-item-row d-flex justify-content-between align-items-center">
                                {editingId === task.id ? (
                                    <input 
                                        className="edit-input"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        onBlur={() => handleEditSave(task.id)}
                                        onKeyDown={(e) => e.key === "Enter" && handleEditSave(task.id)}
                                        autoFocus
                                    />
                                ) : (
                                    <span 
                                        className={`task-content ${task.is_done ? "completed" : ""}`}
                                        onClick={() => toggleTask(task)}
                                    >
                                        {task.label}
                                    </span>
                                )}

                                <div className="action-buttons">
                                    <button 
                                        className="btn-action edit-icon" 
                                        onClick={() => { setEditingId(task.id); setEditValue(task.label); }}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button 
                                        className="btn-action delete-icon" 
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    )}

                    <li className="footer-row d-flex justify-content-between">
                        <span>{tasks.length} items left</span>
                        <button className="btn-clear" onClick={clearAll}>Clear all</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;