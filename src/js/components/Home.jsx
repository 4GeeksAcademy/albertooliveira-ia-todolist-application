import React, { useState } from "react";
import PropTypes from "prop-types";

const Home = ({ tasks, addTask, deleteTask, toggleTask, clearAll, loading }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && inputValue.trim().length >= 3) {
            addTask(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <div className="todo-container">
            <h1 className="todo-header">Tasks</h1>
            <div className="todo-card-body">
                {loading && <div className="spinner-loader">Cargando...</div>}
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

                    {tasks.length === 0 ? (
                        <li className="empty-msg">No tasks, add a new task</li>
                    ) : (
                        tasks.map((task) => (
                            <li key={task.id} className="task-item-row">
                                <span 
                                    className={`task-content ${task.is_done ? "completed" : ""}`}
                                    onClick={() => toggleTask(task)}
                                >
                                    {task.label}
                                </span>
                                
                                <div className="icons-container">
                                    <button className="icon-btn check-btn" onClick={() => toggleTask(task)}>
                                        <i className={task.is_done ? "fas fa-check-circle" : "far fa-circle"}></i>
                                    </button>
                                    <button className="icon-btn delete-btn" onClick={() => deleteTask(task.id)}>
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </li>
                        ))
                    )}

                    <li className="footer-row">
                        <span>{tasks.length} item{tasks.length !== 1 ? "s" : ""} left</span>
                        <button className="clear-btn" onClick={clearAll}>Clear all</button>
                    </li>
                </ul>
            </div>
            <div className="page-stack stack-1"></div>
            <div className="page-stack stack-2"></div>
        </div>
    );
};

Home.propTypes = {
    tasks: PropTypes.array.isRequired,
    addTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
    clearAll: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};

export default Home;