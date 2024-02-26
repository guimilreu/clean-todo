import React, { useEffect, useState } from 'react'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, useDisclosure } from "@nextui-org/react";
import { useTasks } from '../../context/TasksContext';


const View = ({ viewingTask, setViewingTask }) => {
	const [state, setState] = useState({ name: '', description: '' });
	const { isOpen = false, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		if(viewingTask !== undefined) onOpen();
		setState(prev => {
			if(viewingTask === undefined) return { name: '', description: '' };
			return { name: viewingTask.name, description: viewingTask.description };
		});
	}, [viewingTask])

	const handleClose = () => {
		setViewingTask(prev => {
			setState({ name: '', description: '' });
			onOpenChange(false);
			return undefined;
		})
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
						<ModalHeader className="flex flex-col gap-1">{state.name}</ModalHeader>
						<ModalBody>
							{state.description}
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onPress={handleClose}>
								Close
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default View;