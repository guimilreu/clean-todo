import React, { createContext, useContext, useState } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);

	const addTask = (task) => {
		if (tasks.filter(t => t.id === task.id).length > 0) return console.error('Task already exists');
		setTasks((prevTasks) => [...prevTasks, task]);
	};

	const removeTask = (taskId) => {
		setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
	};
	
	const setTask = (id, data) => {
		setTasks((prevTasks) => prevTasks.map(task => {
			if (task.id === id) {
				return { ...task, ...data };
			}
			return task;
		}));
	}

	return (
		<TasksContext.Provider value={{ tasks, addTask, removeTask, setTask }}>
			{children}
		</TasksContext.Provider>
	);
};