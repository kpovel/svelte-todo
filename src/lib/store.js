import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';

function create_todo() {
	/**
	 * @type {import('svelte/store').Writable<{title: string, completed: boolean, id: number}[]>}
	 */
	const todos = writable([]);

	/**
	 * @type {(e: CustomEvent<{title: string}>) => void}
	 */
	function createTodo(e) {
		const randomId = Math.floor(Math.random() * (100_000 - 1 + 1) + 1);
		todos.update((n) => {
			n.unshift({ title: e.detail.title, completed: false, id: randomId });
			return n;
		});
	}

	/**
	 * @type{(e:CustomEvent<{todoId: number}>) => void}
	 */
	function toggleCopletion(e) {
		/**
		 * @type {{title: string, completed: boolean, id: number;}[]}
		 */
		let actualTodos = [];
		const unsubscribe = todos.subscribe((value) => {
			actualTodos = value;
		});

		const theTodo = actualTodos.find((todo) => todo.id === e.detail.todoId);
		if (theTodo) {
			theTodo.completed = !theTodo?.completed;
			todos.set(actualTodos);
		} else {
			console.error(`Todo with ID ${e.detail.todoId} not found.`);
		}

		onDestroy(unsubscribe);
	}

	/**
	 * @type{(e:CustomEvent<{todoId: number}>) => void}
	 */
	function deleteTodo(e) {
		todos.update((t) => t.filter((todo) => todo.id !== e.detail.todoId));
	}

	return {
		subscribe: todos.subscribe,
		createTodo,
		toggleCopletion,
		deleteTodo
	};
}

export const todos = create_todo();