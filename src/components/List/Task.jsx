import React, { useState, useEffect } from 'react'

import { Checkbox, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { MoreVertical, Edit, Trash2, Eye } from 'react-feather';

const Task = ({ concluded = false, task, key, setTask, removeTask, setEditingTask, setViewingTask }) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleSelected = () => {
		setIsSelected(prev => {
			setTask(task.id, { concluded: !prev })
			return !prev
		});
	}

	useEffect(() => {
		setIsSelected(prev => task.concluded)
	}, [task.concluded])

	return (
		<li
			className={`${concluded && 'opacity-60 concluded'} group flex items-center gap-2 px-5 py-2.5 rounded-small bg-content1`}
			key={key}
		>
			<Checkbox isSelected={isSelected} onValueChange={handleSelected}></Checkbox>

			<div className="flex flex-col w-full">
				<p className="font-medium text-lg group-[.concluded]:line-through">{task.name}</p>
				<span className="text-zinc-400 text-sm group-[.concluded]:line-through">{task.description.length <= 150 ? task.description : task.description.slice(0, 150) + '...'}</span>
			</div>

			<div className="flex">
				<Button
					variant="bordered"
					isIconOnly
					onPress={() => setViewingTask(task)}
				>
					<Eye size={16} />
				</Button>

				<Dropdown className="dark text-foreground">
					<DropdownTrigger>
						<Button
							variant="bordered"
							isIconOnly
						>
							<MoreVertical size={16} />
						</Button>
					</DropdownTrigger>

					<DropdownMenu aria-label="Static Actions">
						<DropdownItem
							key="edit"
							endContent={<Edit size={14} />}
							onPress={() => setEditingTask(task)}
						>
							Edit
						</DropdownItem>

						<DropdownItem
							key="delete"
							endContent={<Trash2 size={14} />}
							className="text-danger"
							color="danger"
							onPress={() => removeTask(task.id)}
						>
							Delete
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</li>
	)
}

export default Task