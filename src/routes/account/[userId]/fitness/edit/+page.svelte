<script lang="ts">
	import Button from '$src/lib/components/ui/button/Button.svelte';
	import Input from '$src/lib/components/ui/input/Input.svelte';

	export let data;

	const { userProfile } = data;

	const addParameter = () => {
		console.log('implement add parameter');
	};

	console.log(userProfile.fitness_data);

	let fitnessData = Object.entries(userProfile.fitness_data as Record<string, any>) ?? [];
</script>

<h1 class="w-full text-xl md:mx-auto md:max-w-5xl">Modifica parametri atleta</h1>

<form method="post" class=" w-full md:mx-auto md:max-w-5xl mt-8">
	<div class="p-8 border border-primary space-y-8 flex-col flex">
		{#each fitnessData as [title, value]}
			<div class="flex items-center gap-x-4">
				<div>
					<label for="">Nome parametro</label>
					<Input bind:value={title} />
				</div>
				<span class="pt-6">:</span>
				<div class="w-full">
					<label for="">Valore parametro</label>
					<Input bind:value />
				</div>
				<Button class="mt-6" variant="ghost">-</Button>
			</div>
		{/each}
		<Button type="button" on:click={addParameter} variant="outline">Aggiungi parametro</Button>
	</div>

	<Button class="w-full mt-8">Salva</Button>
</form>
