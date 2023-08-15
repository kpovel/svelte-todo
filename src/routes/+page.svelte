<script>
	import { initTodoStore, todos } from '$lib/store';
	import Todo from './Todo.svelte';
	import Input from './input.svelte';

	initTodoStore();
</script>

<h1>Svelte Todo app</h1>

<Input on:createTodo={todos.createTodo} />

<ul>
	{#each $todos as todo (todo.id)}
		<Todo
			title={todo.title}
			completed={todo.completed}
			id={todo.id}
			on:toggleCopletion={(e) => todos.toggleCopletion(e, $todos)}
			on:deleteTodo={todos.deleteTodo}
		/>
	{/each}
</ul>

{#if $todos.length === 0}
	<p>Your todo list if empty</p>
{/if}

<style>
	ul {
		all: unset;
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    gap: 5px;
	}
</style>
