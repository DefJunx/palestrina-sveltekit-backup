<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data;

	if (data.userProfile.has_compiled) {
		if (browser) {
			throw goto(`/account/${data.userProfile.id}/profileEdit?new=true`);
		}
	}
</script>

<h1>Account page {JSON.stringify(data.userProfile)}</h1>
