import React, { useState } from "react";
import PropTypes from "prop-types";

const Home = (props) => {
	const [inputValue, setInputValue] = useState("");

	const handleKeyPress = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			props.addTask(inputValue.trim());
			setInputValue(""); 
		}
	};

	return (
		<div className="todo-wrapper">
			<h1 className="todo-title">All Tasks</h1>
			<div className="todo-box">
				<div className="input-section">
					<input
						type="text"
						className="task-input"
						placeholder="What needs to be done?"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={handleKeyPress}
					/>
				</div>
				<ul className="todo-list">
					{props.tasks.length === 0 ? (
						<li className="no-tasks">No tasks, add a new task</li>
					) : (
						props.tasks.map((task, index) => (
							<li key={index} className="todo-item">
								<span className="task-text">{task}</span>
								<button 
									className="delete-btn"
									onClick={() => props.deleteTask(index)}
								>
									X
								</button>
							</li>
						))
					)}
				</ul>
				<div className="todo-footer">
					{props.tasks.length} item{props.tasks.length !== 1 ? "s" : ""} left
				</div>
			</div>
			<div className="paper-effect-1"></div>
			<div className="paper-effect-2"></div>
		</div>
	);
};

Home.propTypes = {
	tasks: PropTypes.array.isRequired,
	addTask: PropTypes.func.isRequired,
	deleteTask: PropTypes.func.isRequired
};

export default Home;