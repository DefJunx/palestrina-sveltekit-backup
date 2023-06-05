<script lang="ts">
	export let Icon: any;
	export let label: string;
	export let href: string;

	let innerWidth: number;

	let size = 24;

	$: size = innerWidth < 1024 ? 24 : 36;
</script>

<svelte:window bind:innerWidth />

<a {href} class="flex flex-col md:gap-x-8 md:flex-row items-center">
	<svelte:component this={Icon} color="white" />
	<span class="text-xs md:text-lg text-white">{label}</span>
</a>
