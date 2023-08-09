<script>
	import { createEventDispatcher } from 'svelte';

	/**@type{string}*/
	export let title;
	/**@type{boolean}*/
	export let completed;
	/**@type{number}*/
	export let id;

	const dispatch = createEventDispatcher();

	function toggleCopletion() {
		dispatch('toggleCopletion', { todoId: id });
	}

	function deleteTodo() {
		dispatch('deleteTodo', { todoId: id });
	}
</script>

<p>Title: {title}</p>
<p>Completed: {completed}</p>
<button on:click={toggleCopletion}>Toggle copletion</button>
<p>Id: {id}</p>
<button on:click={deleteTodo}>Delete {title} todo</button>
