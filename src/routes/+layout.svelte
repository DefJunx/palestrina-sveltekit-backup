<script lang="ts">
	import '$src/app.css';
	import 'iconify-icon';

	import { invalidate } from '$app/navigation';
	import DesktopMenu from '$src/components/DesktopMenu.svelte';
	import MobileMenu from '$src/components/MobileMenu.svelte';
	import { onMount } from 'svelte';

	let windowSize: number;

	export let data;

	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:window bind:innerWidth={windowSize} />

<svelte:head>
	<title>Palestrina</title>
	<meta name="description" content="Stay fit" />
</svelte:head>

<div class="flex">
	{#if data.session && windowSize > 768}
		<DesktopMenu />
	{/if}
	<div class="w-full p-4">
		<slot />
	</div>
</div>
{#if data.session && windowSize < 768}
	<MobileMenu />
{/if}
