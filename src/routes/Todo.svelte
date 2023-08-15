<script>
	import { createEventDispatcher } from 'svelte';
	import Trash from '../img/trash.svg';

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

<li class={completed ? "grey" : ""}>
	<div class="left_side">
		<input checked={completed} on:click={toggleCopletion} type="checkbox" />
		<p class={completed ? "line-through": ""}>{title}</p>
	</div>
	<button on:click={deleteTodo}>
		<img src={Trash} alt="delete todo" />
	</button>
</li>

<style>
	li {
		list-style-type: none;
		border: 1px solid grey;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
    min-height: 35px;
    padding: 0 10px;
	}

	p {
		margin: 0;
	}

	.left_side {
		display: flex;
		gap: 3px;
		align-items: center;
	}

  .line-through {
    text-decoration-line: line-through;
  }

  .grey {
    background-color: #c9c9c9;
  }

	button {
		all: unset;
    height: 24px;
	}
</style>
