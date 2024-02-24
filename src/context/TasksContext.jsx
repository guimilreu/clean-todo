import React, { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext();

export const useTasks = () => useContext(TasksContext);

export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);

	const addTask = (task) => {
		if (tasks.filter(t => t.id === task.id).length > 0) return console.error('Task already exists');
		setTasks(prevTasks => {
			let newTasks = [...prevTasks, task];
			localStorage.setItem('tasks', JSON.stringify(newTasks));
			return newTasks;
		})
	};

	const removeTask = (taskId) => {
		setTasks(prevTasks => {
			let newTasks = prevTasks.filter(task => task.id !== taskId);
			localStorage.setItem('tasks', JSON.stringify(newTasks));
			return newTasks;
		})
	};
	
	const setTask = (id, data) => {
		setTasks((prevTasks) => prevTasks.map(task => {
			if (task.id === id) {
				let updatedTask = { ...task, ...data };
				localStorage.setItem('tasks', JSON.stringify(prevTasks.map(t => t.id === id ? updatedTask : t)));
				return updatedTask;
			}
			return task;
		}));
	}

	useEffect(() => {
		const data = localStorage.getItem('tasks');
		if (data) setTasks(JSON.parse(data));
	}, []);

	return (
		<TasksContext.Provider value={{ tasks, addTask, removeTask, setTask }}>
			{children}
		</TasksContext.Provider>
	);
};