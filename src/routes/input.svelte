<script>
	import { createEventDispatcher } from 'svelte';

	let todo = '';

	const dispatch = createEventDispatcher();

	function createTodo() {
		dispatch('createTodo', { title: todo });
	}
</script>

<form
	on:submit|preventDefault={() => {
		if (todo.trim()) {
			createTodo();
			todo = '';
		}
	}}
>
	<input bind:value={todo} type="text" placeholder="New todo" />
	<button type="submit"> Create new Todo </button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	input {
		height: 2em;
		border: 1px solid grey;
		border-radius: 5px;
    padding: 0 5px;
	}

	button {
		all: unset;
		border: 1px solid grey;
		border-radius: 5px;
		text-align: center;
		height: 2em;
	}
</style>
