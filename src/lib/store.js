import { onDestroy, onMount } from 'svelte';
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
	 * @param{CustomEvent<{todoId: number}>} todoId
	 * @param{{title: string, completed: boolean, id: number}[]} todoList
	 */
	function toggleCopletion(todoId, todoList) {
		const theTodo = todoList.find((todo) => todo.id === todoId.detail.todoId);
		if (theTodo) {
			theTodo.completed = !theTodo?.completed;
			todos.set(todoList);
		} else {
			console.error(`Todo with ID ${todoId.detail.todoId} not found.`);
		}
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
		deleteTodo,
		/**
		 * @type {(e: {title: string, completed: boolean, id: number}[]) => void}
		 */
		set: (v) => {
			todos.set(v);
		}
	};
}

export const todos = create_todo();

export function initTodoStore() {
	/**
	 * @type{import("svelte/store").Unsubscriber}
	 */
	let unsubscribe;
	onMount(() => {
		/**
		 * @type {{title: string, completed: boolean, id: number}[]}
		 */
		const stored_todos = JSON.parse(localStorage.getItem('svelte_todo') || '[]');
		todos.set(stored_todos);

		unsubscribe = todos.subscribe((t) => {
			localStorage.setItem('svelte_todo', JSON.stringify(t));
		});
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});
}
