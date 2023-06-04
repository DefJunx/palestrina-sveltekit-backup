<script lang="ts">
	import DesktopMenu from '$src/lib/components/DesktopMenu.svelte';
	import MobileMenu from '$src/lib/components/MobileMenu.svelte';

	export let data;

	const { avatarSrc, fullName } = data;
</script>

<div class="flex">
	<DesktopMenu {avatarSrc} {fullName} />
	<div class="w-full p-4">
		<slot />
	</div>
</div>
<MobileMenu />
