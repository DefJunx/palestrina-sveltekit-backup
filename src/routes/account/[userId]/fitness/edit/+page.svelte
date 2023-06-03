<script lang="ts">
	import Button from '$src/lib/components/ui/button/Button.svelte';
	import Input from '$src/lib/components/ui/input/Input.svelte';

	export let data;

	const { userProfile } = data;

	let fitnessData = userProfile.fitness_data ?? {};
</script>

<h1>Fitness edit</h1>

<form method="post" class="flex w-full flex-col space-y-8 md:mx-auto md:max-w-5xl mt-8">
	{#each Object.entries(fitnessData) as [title, value], i}
		<div class="flex">
			<input type="hidden" name={`fitness_${i}`} bind:value={title} />
			<Input bind:value name={`fitness_${i}`} />
		</div>
	{/each}

	<Button>Salva</Button>
</form>
