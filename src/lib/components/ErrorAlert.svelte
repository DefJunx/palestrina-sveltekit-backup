<script lang="ts">
	import Alert from '$src/lib/components/ui/alert/Alert.svelte';
	import AlertDescription from '$src/lib/components/ui/alert/AlertDescription.svelte';
	import AlertTitle from '$src/lib/components/ui/alert/AlertTitle.svelte';
	import { AlertCircle } from 'lucide-svelte';

	export let title = 'Errore';
	export let description: string;
</script>

<Alert variant="destructive">
	<AlertCircle class="h-4 w-4" />
	<AlertTitle>{title}</AlertTitle>
	<AlertDescription>{description}</AlertDescription>
</Alert>
