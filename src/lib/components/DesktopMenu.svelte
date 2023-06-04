<script lang="ts">
	import Button from './ui/button/Button.svelte';

	export let userId: string;
</script>

<aside class="min-h-screen hidden md:block w-80 bg-primary px-4 py-8 duration-300">
	<div class="flex flex-col justify-stretch h-full">
		<div class="flex flex-col">
			<Button class="text-white text-xl font-semibold" variant="link" href="/account"
				>Palestrina</Button
			>
		</div>
		<div class="grow my-8">Menu</div>
	</div>
</aside>
