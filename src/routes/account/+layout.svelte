<script lang="ts">
	import DesktopMenu from '$src/lib/components/DesktopMenu.svelte';
	import MobileMenu from '$src/lib/components/MobileMenu.svelte';

	export let data;

	$: ({ avatarSrc, fullName, userId } = data);
</script>

<div class="flex">
	{#key data.avatarSrc}
		<DesktopMenu {userId} {avatarSrc} {fullName} />
	{/key}
	<div class="w-full p-4 mb-12 md:mb-0">
		<slot />
	</div>
</div>
<MobileMenu {userId} {avatarSrc} {fullName} />
