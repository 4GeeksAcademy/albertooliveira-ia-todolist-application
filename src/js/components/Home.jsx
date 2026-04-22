import React, { useState } from "react";
import PropTypes from "prop-types";

const Home = (props) => {
	const [inputValue, setInputValue] = useState("");
	const [error, setError] = useState(false);

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			if (inputValue.trim() === "" || inputValue.trim().length < 3) {
				setError(true);
			} else {
				props.addTask(inputValue.trim());
				setInputValue(""); 
				setError(false);
			}
		}
	};

	return (
		<div className="todo-container">
			<h1 className="todo-header">All Tasks</h1>
			<div className="todo-card-body">
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
					
					{error && (
						<li className="error-message">
							The task must have at least 3 characters.
						</li>
					)}

					{props.tasks.length === 0 ? (
						<li className="empty-msg">No tasks, add a new task</li>
					) : (
						props.tasks.map((task, index) => (
							<li key={index} className="task-item-row">
								<span className="task-content">{task}</span>
								<button className="del-btn" onClick={() => props.deleteTask(index)}>
									X
								</button>
							</li>
						))
					)}
					<li className="footer-row">
						{props.tasks.length} item{props.tasks.length !== 1 ? "s" : ""} left
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
	deleteTask: PropTypes.func.isRequired
};

export default Home;