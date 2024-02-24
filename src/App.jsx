import * as React from "react";
import { TasksProvider } from './context/TasksContext';
import { Link } from "@nextui-org/react";

// Components
import { AddTask, List } from "./components";

import './assets/style/global.css'

function App() {
	return (
		<TasksProvider>
			<div className="relative flex items-center justify-center h-screen overflow-hidden">
				<div className="flex flex-col gap-4 max-w-2xl w-full h-2/3 px-8 md:p-0">
					<div className="flex w-full justify-between">
						<h1 className="text-white font-medium text-3xl sm:text-5xl">
							Clean ToDo
						</h1>

						<AddTask />
					</div>

					<List />
				</div>

				<Link isExternal href="https://github.com/guimilreu/clean-todo" className="hover:opacity-100 fixed bottom-8">
					<p className="text-zinc-500">Developed by <span className="text-blue-500 hover:underline">guimilreu</span>.</p>
				</Link>
			</div>
		</TasksProvider>
	);
}

export default App;