<script lang="ts">
	import { Calendar, Dumbbell, Home } from 'lucide-svelte';
	import MenuElement from './MenuElement.svelte';

	export let avatarSrc: string;
	export let fullName: string;
	export let userId: string;
</script>

<div
	class="md:hidden flex gap-x-2 px-4 justify-between items-center fixed bottom-0 left-0 w-screen bg-primary h-12"
>
	<MenuElement href="/account" label="Home" Icon={Home} />
	<MenuElement href={`/account/${userId}/training`} label="Allenamenti" Icon={Dumbbell} />
	<MenuElement href="/account/booking" label="Prenotazioni" Icon={Calendar} />
</div>
