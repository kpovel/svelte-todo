<script>
	/**
	 * @type {(title: string) => void}
	 */
	export let createTodo;

	let todo = '';
</script>

<form
	on:submit|preventDefault={() => {
		if (todo.trim()) {
			createTodo(todo);
			todo = '';
		}
	}}
>
	<input bind:value={todo} type="text" placeholder="New todo" />
	<button type="submit"> Create new Todo </button>
</form>
