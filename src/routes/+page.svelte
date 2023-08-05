<script>
	import Todo from './Todo.svelte';
	import Input from './input.svelte';

	/**
	 * @type {{title: string, completed: boolean, id: number}[]}
	 */
	let todos = [];

	/**
	 * @type {(title: string) => void}
	 */
	function createTodo(title) {
		const randomId = Math.floor(Math.random() * (100_000 - 1 + 1) + 1);
		todos = [{ title, completed: false, id: randomId }, ...todos];
	}

	/**
	 * @type {(todoId: number) => void}
	 */
	function toggleCopletion(todoId) {
		const theTodo = todos.find((todo) => todo.id == todoId);
		if (theTodo) {
			theTodo.completed = !theTodo?.completed;
			todos = todos;
		} else {
			console.error(`Todo with ID ${todoId} not found.`);
		}
	}

	/**
	 * @type{(todoId: number) => void}
	 */
	function deleteTodo(todoId) {
		todos = todos.filter((todo) => todo.id !== todoId);
	}
</script>

<h1>Svelte Todo app</h1>

<Input {createTodo} />

{#each todos as todo (todo.id)}
	<Todo title={todo.title} completed={todo.completed} id={todo.id} {toggleCopletion} {deleteTodo} />
{/each}

{#if todos.length === 0}
	<p>Your todo list if empty</p>
{/if}
