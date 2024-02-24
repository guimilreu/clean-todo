import React, { useState } from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";

import { useTasks } from '../../context/TasksContext';

const Form = ({ isOpen, onOpenChange, }) => {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const { addTask } = useTasks();

	const handleSubmit = () => {
		addTask({ id: Date.now(), name: name, description: description, concluded: false });
		clearInputs();
		onOpenChange(false);
		console.log(onOpenChange)
	};

	function clearInputs() {
		setName(prev => '');
		setDescription(prev => '');
	}


	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
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
						<ModalHeader className="flex flex-col gap-1">Add new task</ModalHeader>
						<ModalBody>
							<Input
								autoFocus
								label="Name"
								placeholder="Enter your task name"
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<Textarea
								label="Description"
								placeholder="Enter the task description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onPress={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={handleSubmit}>
								Add
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default Form