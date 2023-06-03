<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$src/lib/components/ui/button/Button.svelte';

	export let data;

	if (!data.userProfile.has_compiled) {
		if (browser) {
			goto(`/account/${data.userProfile.id}/profileEdit?new=true`);
		}
	}
</script>

<h1>Account page {JSON.stringify(data.userProfile)}</h1>
<Button variant="link" href={`/account/${data.userProfile.id}/profileEdit`}
	>Vai al tuo profilo</Button
>
