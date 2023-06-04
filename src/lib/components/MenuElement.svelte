<script lang="ts">
	export let Icon: any;
	export let label: string;
	export let href: string;

	let innerWidth: number;

	let size = 24;

	$: size = innerWidth < 1024 ? 24 : 48;
</script>

<svelte:window bind:innerWidth />

<a {href} class="flex flex-col items-center">
	<Icon {size} color="white" />
	<span class="text-xs text-white">{label}</span>
</a>
