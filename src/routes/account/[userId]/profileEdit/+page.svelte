<script lang="ts">
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	import { page } from '$app/stores';

	import Button from '$src/lib/components/ui/button/Button.svelte';
	import Input from '$src/lib/components/ui/input/Input.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form, errors, enhance } = superForm(data.form);
</script>

<h1 class="w-full text-xl md:mx-auto md:max-w-5xl">
	{#if $page.url.searchParams.has('new')}
		Benvenuto su palestrina. Per favore, compila la seguente form con i tuoi dati per procedere.
	{:else}
		Modifica il tuo profilo
	{/if}
</h1>

<div class="mt-12">
	<form method="post" class="flex w-full flex-col space-y-8 md:mx-auto md:max-w-5xl" use:enhance>
		<div class="flex flex-col">
			<label for="username">Username</label>
			<Input class="mt-1" type="text" name="username" bind:value={$form.username} />
			{#if $errors.username}
				<small class="font-semibold text-red-400">{$errors.username.join('\n')}</small>
			{/if}
		</div>
		<div class="flex flex-col">
			<label for="full_name">Nome</label>
			<Input type="text" name="full_name" bind:value={$form.full_name} />
		</div>
		<Button type="submit">Salva</Button>
	</form>
</div>

<div class="absolute bottom-4 left-[50%] w-[1200px] translate-x-[-50%]">
	<SuperDebug data={$form} />
</div>
