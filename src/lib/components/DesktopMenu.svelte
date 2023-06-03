<script lang="ts">
	import { getAvatarFallbackfromName } from '../utils';
	import Avatar from './Avatar.svelte';
	import Button from './ui/button/Button.svelte';

	export let avatarSrc = '';
	export let fullName = '';

	let fallback = '';

	$: {
		fallback = getAvatarFallbackfromName(fullName);
	}
</script>

<aside class="h-screen hidden md:block w-80 bg-primary px-4 py-8 duration-300">
	<div class="flex flex-col justify-between h-full">
		<div class="flex flex-col">
			<Button class="text-white text-xl font-semibold" variant="link" href="/account"
				>Palestrina</Button
			>
		</div>
		<div class="grow my-8">Menu</div>
		<div class="flex gap-x-4 items-center">
			<Avatar src={avatarSrc} alt="Avatar image" {fallback} />
			<span class="text-white font-semibold">{fullName}</span>
		</div>
	</div>
</aside>
