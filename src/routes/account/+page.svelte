<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Avatar from '$src/lib/components/Avatar.svelte';
	import Button from '$src/lib/components/ui/button/Button.svelte';
	import { getAvatarFallbackfromName, getAvatarUrl } from '$src/lib/utils.js';

	export let data;
	let fallback = '';
	let src = '';

	const { supabase } = data;

	if (!data.userProfile.has_compiled) {
		if (browser) {
			goto(`/account/${data.userProfile.id}/profileEdit?new=true`);
		}
	}

	if (data.userProfile.full_name) {
		fallback = getAvatarFallbackfromName(data.userProfile.full_name);
	}

	if (data.userProfile.avatar_url) {
		getAvatarUrl(supabase, data.userProfile.avatar_url).then((avatarSrc) => (src = avatarSrc));
	}
</script>

<div class="w-full md:max-w-5xl md:mx-auto">
	<section class="p-8 border border-primary rounded-lg flex gap-x-8 items-center">
		<Avatar class="w-32 h-32" {src} username={data.userProfile.username ?? ''} {fallback} />
		<div class="flex flex-col">
			<span>Nome: {data.userProfile.full_name}</span>
			<span>Username: {data.userProfile.username}</span>
		</div>
	</section>
	<section class="mt-4">
		<h2 class="text-xl font-bold">Parametri fitness</h2>
		<div>
			{#if data.userProfile.fitness_data}
				{#each Object.entries(data.userProfile.fitness_data) as [title, value]}
					<div>
						<strong>{title}</strong>
						<span>{value}</span>
					</div>
				{/each}
			{:else}
				<div>Non ci sono dati</div>
			{/if}
		</div>
	</section>

	<Button variant="link" href={`/account/${data.userProfile.id}/profileEdit`}
		>Modifica il profilo</Button
	>
</div>
