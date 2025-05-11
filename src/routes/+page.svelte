<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	
	// Use `data` prop passed by SvelteKit
	export let data: {
		projects: any[];
	};

	$: gaugeSize = data.projects.length <= 3 ? 25 : 12.5;

	onMount(() => {
		const interval = setInterval(() => {
			invalidate(''); // this re-runs +page.server.ts `load()`
		}, 10 * 60 * 1000); // 10 minutes

		return () => clearInterval(interval); // clean up when component is destroyed
	});
</script>


<svelte:head>
	<title>Project Tracker</title>
</svelte:head>

<main class="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
	<div class="mx-auto h-full">
		<!-- Project Cards Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
			{#each data.projects as project (project.id)}
				<div class="h-full">
					<ProjectCard {project} {gaugeSize}/>
				</div>
			{/each}
		</div>
	</div>
</main>
