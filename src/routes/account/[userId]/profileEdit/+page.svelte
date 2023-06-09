<script lang="ts">
	import { page } from '$app/stores';

	import Button from '$src/lib/components/ui/button/Button.svelte';
	import Input from '$src/lib/components/ui/input/Input.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Avatar from './Avatar.svelte';

	export let data;
	const { supabase, avatarPath } = data;

	let avatarFallback = '';
	let avatarSrc = '';

	const previewAvatar = async (e: Event) => {
		const inputElement = e.target as HTMLInputElement;
		if (inputElement.files && inputElement.files.length !== 0) {
			const avatar = inputElement.files[0];
			avatarSrc = URL.createObjectURL(avatar);
		}
	};

	const downloadAvatar = async () => {
		try {
			const { data: avatarUrl } = await supabase.storage.from('avatars').getPublicUrl(avatarPath);
			avatarSrc = avatarUrl.publicUrl;
		} catch (error) {
			console.error(error);
		}
	};

	$: {
		if (avatarPath) {
			downloadAvatar();
		}
	}

	$: {
		if ($form.full_name) {
			const nameParts = $form.full_name.split(' ');
			const initials = nameParts.map((part) => part.charAt(0).toUpperCase());
			avatarFallback = initials.join('');
		}
	}

	const { form, errors, enhance } = superForm(data.form);
</script>

<h1 class="w-full text-xl md:mx-auto md:max-w-5xl">
	{#if $page.url.searchParams.has('new')}
		Benvenuto su palestrina. Per favore, compila la seguente form con i tuoi dati per procedere.
	{:else}
		Modifica il tuo profilo
	{/if}
</h1>

<form
	method="post"
	class="flex w-full flex-col space-y-8 md:mx-auto md:max-w-5xl mt-6"
	use:enhance
	enctype="multipart/form-data"
>
	<div class="flex flex-col">
		<label for="username">Username</label>
		<Input class="mt-1" type="text" name="username" bind:value={$form.username} />
		{#if $errors.username}
			<small class="font-semibold text-red-400">{$errors.username}</small>
		{/if}
	</div>
	<div class="flex flex-col">
		<label for="full_name">Nome</label>
		<Input type="text" name="full_name" bind:value={$form.full_name} />
		{#if $errors.full_name}
			<small class="font-semibold text-red-400">{$errors.full_name}</small>
		{/if}
	</div>
	<div class="flex flex-col">
		<label for="full_name">Avatar</label>
		<div class="mt-4 flex items-center gap-x-4">
			<Avatar src={avatarSrc} username={$form.username ?? ''} fallback={avatarFallback} />
			<Input type="file" name="avatar" accept="image/*" on:change={previewAvatar} />
		</div>
	</div>
	<Button type="submit">Salva</Button>
</form>
