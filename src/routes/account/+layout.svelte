<script lang="ts">
	import DesktopMenu from '$src/lib/components/DesktopMenu.svelte';
	import MobileMenu from '$src/lib/components/MobileMenu.svelte';
	import { getAvatarUrl } from '$src/lib/utils.js';

	export let data;

	const { userProfile, supabase } = data;

	let avatarSrc = '';
	let fullName = userProfile?.full_name ?? '';
	$: {
		if (userProfile && userProfile.avatar_path) {
			getAvatarUrl(supabase, userProfile.avatar_path).then((src) => (avatarSrc = src));
		}
	}
</script>

<div class="flex">
	<DesktopMenu {avatarSrc} {fullName} />
	<div class="w-full p-4">
		<slot />
	</div>
</div>
<MobileMenu />
