import React from 'react'
import { Button, useDisclosure } from "@nextui-org/react";
import { PlusCircle } from 'react-feather';

import Form from './Form';

const index = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button onPress={onOpen} color="primary" startContent={<PlusCircle size={16} />}>Add new</Button>

			<Form isOpen={isOpen} onOpenChange={onOpenChange} />
		</>
	)
}

export default index