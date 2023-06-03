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
	<h1>Account page {JSON.stringify(data.userProfile)}</h1>
	<Button variant="link" href={`/account/${data.userProfile.id}/profileEdit`}
		>Vai al tuo profilo</Button
	>
</div>
