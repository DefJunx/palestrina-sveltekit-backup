<script lang="ts">
	import Avatar from '$src/lib/components/ui/avatar/Avatar.svelte';
	import AvatarFallback from '$src/lib/components/ui/avatar/AvatarFallback.svelte';
	import AvatarImage from '$src/lib/components/ui/avatar/AvatarImage.svelte';

	export let username = '';
	export let src = '';
	export let fallback = '';
</script>

<Avatar>
	<AvatarImage {src} alt={username} />
	<AvatarFallback>{fallback}</AvatarFallback>
</Avatar>
