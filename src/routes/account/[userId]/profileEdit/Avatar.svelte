<script lang="ts">
	import Avatar from '$src/lib/components/ui/avatar/Avatar.svelte';
	import AvatarFallback from '$src/lib/components/ui/avatar/AvatarFallback.svelte';
	import AvatarImage from '$src/lib/components/ui/avatar/AvatarImage.svelte';
	import type { SupabaseClient } from '@supabase/supabase-js';

	export let supabase: SupabaseClient;
	export let username = '';
	export let src = '';
	export let fallback = '';
</script>

<Avatar class="w-16 h-16 shrink-0">
	<AvatarImage {src} alt={username} />
	<AvatarFallback>{fallback}</AvatarFallback>
</Avatar>
