<script>
	import { initTodoStore, todos } from '$lib/store';
	import Todo from './Todo.svelte';
	import Input from './input.svelte';

  initTodoStore();
</script>

<h1>Svelte Todo app</h1>

<Input on:createTodo={todos.createTodo} />

{#each $todos as todo (todo.id)}
	<Todo
		title={todo.title}
		completed={todo.completed}
		id={todo.id}
		on:toggleCopletion={todos.toggleCopletion}
		on:deleteTodo={todos.deleteTodo}
	/>
{/each}

{#if $todos.length === 0}
	<p>Your todo list if empty</p>
{/if}
