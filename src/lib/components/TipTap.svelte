<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

	let editor: Editor;
	let element: HTMLDivElement;
	export let content = '';

	$: console.log(content);

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			},
			onTransaction: () => {
				editor = editor;
			},
			editorProps: {
				attributes: {
					class:
						'prose dark:prose-invert prose-sm sm:prose-base border border-primary min-w-full focus:outline-none'
				}
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<button
		type="button"
		on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		class:active={editor.isActive('heading', { level: 1 })}
	>
		H1
	</button>
	<button
		type="button"
		on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		class:active={editor.isActive('heading', { level: 2 })}
	>
		H2
	</button>
	<button
		type="button"
		on:click={() => editor.chain().focus().setParagraph().run()}
		class:active={editor.isActive('paragraph')}
	>
		P
	</button>
{:else}
	<div>Loading...</div>
{/if}

<div class="mt-4" bind:this={element} />

<style>
	button.active {
		background: black;
		color: white;
	}
</style>
