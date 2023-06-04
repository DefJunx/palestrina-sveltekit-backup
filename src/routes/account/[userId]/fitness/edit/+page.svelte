<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import ErrorAlert from '$src/lib/components/ErrorAlert.svelte';

	import Button from '$src/lib/components/ui/button/Button.svelte';
	import Input from '$src/lib/components/ui/input/Input.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	export let form;

	let loading = false;

	const { userProfile } = data;

	const addParameter = () => {
		console.log('implement add parameter');
		fitnessData = [...fitnessData, ['', '']];
	};

	const removeParameter = () => {
		console.log('implement remove parameter');
	};

	const handleSubmit: SubmitFunction = ({ formData }) => {
		loading = true;

		return async ({ update, result }) => {
			await update();
			loading = false;

			if (result.type === 'success') {
				goto('/account');
			}
		};
	};

	let fitnessData = Object.entries(userProfile.fitness_data as Record<string, any>) ?? [];
</script>

<h1 class="w-full text-xl md:mx-auto md:max-w-5xl">Modifica parametri atleta</h1>

<form method="post" class=" w-full md:mx-auto md:max-w-5xl mt-8" use:enhance={handleSubmit}>
	{#if form?.error}
		<div class="mb-8">
			<ErrorAlert description={form?.errorMessage ?? 'Si è verificato un errore'} />
		</div>
	{/if}
	<div class="p-8 border border-primary space-y-8 flex-col flex">
		{#each fitnessData as [name, value]}
			<div class="flex items-center gap-x-4">
				<div>
					<label for="">Nome parametro</label>
					<Input bind:value={name} />
				</div>
				<span class="pt-6">:</span>
				<div class="w-full">
					<label for="">Valore parametro</label>
					<Input bind:value />
				</div>
				<input
					type="hidden"
					name={form?.fitnessData?.[name]?.name ?? name}
					value={form?.fitnessData?.[name]?.value ?? value}
				/>
				<Button class="mt-6" type="button" variant="ghost" on:click={removeParameter}>-</Button>
			</div>
		{/each}
		<Button type="button" on:click={addParameter} variant="outline">Aggiungi parametro</Button>
	</div>

	<Button class="w-full mt-8">Salva</Button>
</form>
