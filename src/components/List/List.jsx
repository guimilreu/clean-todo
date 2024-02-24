import React, { useState } from 'react'
import { useTasks } from '../../context/TasksContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollShadow } from "@nextui-org/react";

import Task from './Task'
import Editing from './Editing'

const index = () => {
	const { tasks, setTask, removeTask } = useTasks();
	const [editingTask, setEditingTask] = useState();

	if (tasks.length === 0) return <div className="text-zinc-400 text-left">You don't have any tasks.</div>

	return (
		<ScrollShadow className="w-full max-h-[80vh] overflow-y-auto flex flex-col gap-4">
			{tasks.length > 0 && tasks.filter(task => !task.concluded).length > 0 && <div className="flex flex-col gap-1">
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<span className="text-white text-md">Pending</span>
						<ul className="dark text-foreground space-y-2">
							{tasks.map((task, idx) => !task.concluded && (
								<motion.div
									key={idx}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Task task={task} key={task.id} setTask={setTask} removeTask={removeTask} setEditingTask={setEditingTask} />
								</motion.div>
							))}
						</ul>
					</motion.div>
				</AnimatePresence>
			</div>}

			{tasks.length > 0 && tasks.filter(task => task.concluded).length > 0 && <div className="flex flex-col gap-1">
				<AnimatePresence>
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<span className="text-white text-md">Concluded</span>
						<ul className="dark text-foreground space-y-2">
							{tasks.map((task, idx) => task.concluded && (
								<motion.div
									key={idx}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<Task concluded task={task} key={task.id} setTask={setTask} removeTask={removeTask} setEditingTask={setEditingTask} />
								</motion.div>
							))}
						</ul>
					</motion.div>
				</AnimatePresence>
			</div>}

			<Editing editingTask={editingTask} setEditingTask={setEditingTask} />
		</ScrollShadow>
	)
}

export default index