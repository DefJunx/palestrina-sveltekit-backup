<script lang="ts">
	import Avatar from '$src/lib/components/ui/avatar/Avatar.svelte';
	import AvatarFallback from '$src/lib/components/ui/avatar/AvatarFallback.svelte';
	import AvatarImage from '$src/lib/components/ui/avatar/AvatarImage.svelte';
	import { cn } from '../utils';

	export let alt = '';
	export let src = '';
	export let fallback = '';
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<Avatar class={cn('w-16 h-16 shrink-0', className)}>
	<AvatarImage {src} {alt} />
	<AvatarFallback>{fallback}</AvatarFallback>
</Avatar>
