import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "../styles/index.css";
import Home from "./components/Home.jsx";

const MainApp = () => {
	const [tasks, setTasks] = useState([]);

	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const deleteTask = (indexToDelete) => {
		setTasks(tasks.filter((_, index) => index !== indexToDelete));
	};

	return (
		<div className="main-wrapper">
			<Home tasks={tasks} addTask={addTask} deleteTask={deleteTask} />
		</div>
	);
};

ReactDOM.createRoot(document.getElementById('root')).render(<MainApp />);