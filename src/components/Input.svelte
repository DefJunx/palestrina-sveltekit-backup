<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface $$Props extends HTMLInputAttributes {}
</script>

<!-- className={twMerge(
          "mt-1 rounded-sm border p-2 shadow-sm file:mr-2 file:cursor-pointer file:border-0 file:border-r file:border-neutral-300 file:bg-transparent file:p-2 focus:outline-none disabled:opacity-70 file:disabled:cursor-not-allowed",
          className,
          type === "file" && "cursor-pointer disabled:cursor-not-allowed"
        )} -->
<input
	class={twMerge(
		'mt-1 rounded-sm border p-2 shadow-sm file:mr-2 file:cursor-pointer file:border-0 file:border-r file:border-neutral-300 file:bg-transparent file:p-2 focus:outline-none disabled:opacity-70 file:disabled:cursor-not-allowed',
		$$restProps.type === 'file' && 'cursor-pointer disabled:cursor-not-allowed'
	)}
	{...$$restProps}
/>
