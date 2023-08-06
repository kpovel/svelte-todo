<script>
	import Todo from './Todo.svelte';
	import Input from './input.svelte';

	/**
	 * @type {{title: string, completed: boolean, id: number}[]}
	 */
	let todos = [];

	/**
	 * @type {(e: CustomEvent<{title: string}>) => void}
	 */
	function createTodo(e) {
		const randomId = Math.floor(Math.random() * (100_000 - 1 + 1) + 1);
		todos = [{ title: e.detail.title, completed: false, id: randomId }, ...todos];
	}

	/**
	 * @type{(e:CustomEvent<{todoId: number}>) => void}
	 */
	function toggleCopletion(e) {
		const theTodo = todos.find((todo) => todo.id === e.detail.todoId);
		if (theTodo) {
			theTodo.completed = !theTodo?.completed;
			todos = todos;
		} else {
			console.error(`Todo with ID ${e.detail.todoId} not found.`);
		}
	}

	/**
	 * @type{(e:CustomEvent<{todoId: number}>) => void}
	 */
	function deleteTodo(e) {
		todos = todos.filter((todo) => todo.id !== e.detail.todoId);
	}
</script>

<h1>Svelte Todo app</h1>

<Input on:createTodo={createTodo} />

{#each todos as todo (todo.id)}
	<Todo
		title={todo.title}
		completed={todo.completed}
		id={todo.id}
		on:toggleCopletion={toggleCopletion}
		on:deleteTodo={deleteTodo}
	/>
{/each}

{#if todos.length === 0}
	<p>Your todo list if empty</p>
{/if}
