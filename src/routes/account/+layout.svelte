<script lang="ts">
	import DesktopMenu from '$src/lib/components/DesktopMenu.svelte';
	import MobileMenu from '$src/lib/components/MobileMenu.svelte';
</script>

<div class="flex">
	<DesktopMenu />
	<div class="w-full p-4">
		<slot />
	</div>
</div>
<MobileMenu />
