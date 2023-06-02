<script lang="ts">
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<div class="flex h-screen items-center justify-center">
	<div class="flex w-full flex-col gap-y-8 md:max-w-3xl">
		<h1 class="text-center text-2xl">Palestrina</h1>
		<Auth
			additionalData={{}}
			supabaseClient={data.supabase}
			appearance={{ theme: ThemeSupa }}
			redirectTo={`${data.url}/logging-in?redirect=/account`}
		/>
	</div>
</div>
