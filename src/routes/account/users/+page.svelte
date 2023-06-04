<script lang="ts">
	export let data;
</script>

<div class="w-full md:mx-auto md:max-w-5xl">
	<h1 class="text-xl">Utenti</h1>

	<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
		{#each data.users as user}
			<img src={user.avatarSrc} alt="asd" />
		{/each}
	</div>
</div>

{JSON.stringify(data.users)}
