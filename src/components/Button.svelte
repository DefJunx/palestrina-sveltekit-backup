<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { twMerge } from 'tailwind-merge';

	interface $$Props extends HTMLButtonAttributes {}
</script>

<!-- className={twMerge(
        ,
        className
      )} -->

<button
	class={twMerge(
		'w-full bg-yellow-400 p-4 text-white disabled:cursor-not-allowed disabled:opacity-70'
	)}
	{...$$restProps}><slot /></button
>
