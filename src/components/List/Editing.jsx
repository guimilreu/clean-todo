import React, { useEffect, useState } from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure } from "@nextui-org/react";
import { useTasks } from '../../context/TasksContext';


const Editing = ({ editingTask, setEditingTask }) => {
	const [state, setState] = useState({ name: '', description: '' });
	const { isOpen = false, onOpen, onOpenChange } = useDisclosure();
	const { setTask } = useTasks();

	useEffect(() => {
		let inEditMode = editingTask !== undefined;
		if (inEditMode) onOpen();

		handleState('name', editingTask?.name);
		handleState('description', editingTask?.description);
	}, [editingTask])

	const handleState = (key, value) => {
		setState(prev => ({ ...prev, [key]: value }));
	}

	const handleSubmit = () => {
		setTask(editingTask.id, { name: state.name, description: state.description });
		clearInputs();
		handleClose();
	};

	const handleClose = () => {
		setEditingTask(prev => {
			onOpenChange(false);
			return undefined;
		})
	}

	function clearInputs() {
		setState(prev => ({ name: '', description: '' }));
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={() => handleClose()}
			backdrop="blur"
			placement="top-center"
			className="dark text-foreground"
			motionProps={{
				variants: {
					enter: {
						y: 0,
						opacity: 1,
						transition: {
							duration: 0.3,
							ease: "easeOut",
						},
					},
					exit: {
						y: -20,
						opacity: 0,
						transition: {
							duration: 0.2,
							ease: "easeIn",
						},
					},
				}
			}}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Edit the task</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								label="Name"
								placeholder="Enter your task name"
								value={state.name}
								onChange={(e) => handleState("name", e.target.value)}
							/>
							<Textarea
								label="Description"
								placeholder="Enter the task description"
								value={state.description}
								onChange={(e) => handleState("description", e.target.value)}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onPress={handleClose}>
								Close
							</Button>
							<Button color="primary" onPress={() => handleSubmit()}>
								Update
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default Editing