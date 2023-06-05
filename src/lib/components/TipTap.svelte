<script lang="ts">
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { Heading1, Heading2, List, ListOrdered, Minus, Pilcrow } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import Button from './ui/button/Button.svelte';

	let editor: Editor;
	let element: HTMLDivElement;
	export let content = '';

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [StarterKit],
			content,
			onUpdate({ editor }) {
				content = editor.getHTML();
			},
			onTransaction() {
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
	<div class="flex gap-x-2 items-center">
		<Button
			variant="outline"
			size="xs"
			class={editor.isActive('heading', { level: 1 }) ? 'bg-primary text-primary-foreground' : ''}
			type="button"
			on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
		>
			<Heading1 />
		</Button>
		<Button
			variant="outline"
			size="xs"
			class={editor.isActive('heading', { level: 2 }) ? 'bg-primary text-primary-foreground' : ''}
			type="button"
			on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
		>
			<Heading2 />
		</Button>
		<Button
			variant="outline"
			size="xs"
			class={editor.isActive('paragraph') ? 'bg-primary text-primary-foreground' : ''}
			type="button"
			on:click={() => editor.chain().focus().setParagraph().run()}
		>
			<Pilcrow />
		</Button>
		<Button
			variant="outline"
			size="xs"
			class={editor.isActive('bulletList') ? 'bg-primary text-primary-foreground' : ''}
			type="button"
			on:click={() => editor.chain().focus().toggleBulletList().run()}
		>
			<List />
		</Button>
		<Button
			variant="outline"
			size="xs"
			class={editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : ''}
			type="button"
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
		>
			<ListOrdered />
		</Button>
		<Button
			variant="outline"
			size="xs"
			class={editor.isActive('orderedList') ? 'bg-primary text-primary-foreground' : ''}
			type="button"
			on:click={() => editor.chain().focus().toggleOrderedList().run()}
		>
			<Minus />
		</Button>
	</div>
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
