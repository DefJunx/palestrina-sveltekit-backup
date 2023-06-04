<script lang="ts">
	import { Calendar, ClipboardEdit, Dumbbell, Home, User } from 'lucide-svelte';
	import MenuElement from './MenuElement.svelte';

	export let userId: string;
</script>

<aside class="min-h-screen hidden md:block w-80 bg-primary px-4 py-8 duration-300">
	<div class="flex flex-col justify-stretch h-full">
		<div class="flex flex-col">
			<h2 class="text-white text-xl font-semibold underline underline-offset-4 text-center">
				Palestrina
			</h2>
		</div>
		<div class="flex flex-col">
			<div class="grow my-8 flex flex-col gap-y-8">
				<MenuElement href="/account" label="Home" Icon={Home} />
				<MenuElement href={`/account/${userId}/training`} label="Allenamenti" Icon={Dumbbell} />
				<MenuElement href="/account/booking" label="Prenotazioni" Icon={Calendar} />
			</div>
			<div class="flex flex-col gap-y-8">
				<h2 class="mb-2 text-white text-xl text-center underline underline-offset-4">Gestione</h2>
				<MenuElement href="/account/users" label="Utenti" Icon={User} />
				<MenuElement href="/account/exercises" label="Esercizi" Icon={ClipboardEdit} />
			</div>
		</div>
	</div>
</aside>
