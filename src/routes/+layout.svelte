<script lang="ts">
	import 'iconify-icon';
	import '../app.css';

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { twMerge } from 'tailwind-merge';

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

	let isSidebarOpen = false;
</script>

<svelte:head>
	<title>Palestrina</title>
	<meta name="description" content="Stay fit" />
</svelte:head>

<div class="flex">
	<!-- {twMerge(

			// sidebar.isOpen && 'md:w-80'
		)} -->
	{#if data.session}
		<aside
			class={twMerge(
				'relative h-screen bg-yellow-500 p-4 pt-8 duration-300 w-0 md:w-20',
				isSidebarOpen && 'md:w-80'
			)}
		>
			<button
				class={twMerge(
					'absolute -right-4 duration-300 -rotate-180 rounded-full border border-yellow-400 bg-white text-2xl text-yellow-400 cursor-pointer',
					isSidebarOpen && 'rotate-0'
				)}
				on:click|preventDefault={() => (isSidebarOpen = !isSidebarOpen)}
				aria-label="Menu toggle button"
			>
				<iconify-icon class="block p-1" icon="bi:arrow-left" />
			</button>
		</aside>
	{/if}
	<div class="w-full p-4">
		<slot />
	</div>
</div>
