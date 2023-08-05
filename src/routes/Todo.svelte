<script>
	/**@type{string}*/
	export let title;
	/**@type{boolean}*/
	export let completed;
	/**@type{number}*/
	export let id;

	/**
	 * @type {(todoId: number) => void}
	 */
	export let toggleCopletion;

	/**
	 * @type{(todoId: number) => void}
	 */
	export let deleteTodo;
</script>

<p>Title: {title}</p>
<p>Completed: {completed}</p>
<button on:click={() => toggleCopletion(id)}>Toggle copletion</button>
<p>Id: {id}</p>
<button on:click={() => deleteTodo(id)}>Delete {title} todo</button>
