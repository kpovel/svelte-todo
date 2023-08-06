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
