<!-- src/routes/+page.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchProjectProgress } from '$lib/redmine';
	import ProjectCard from '$lib/components/ProjectCard.svelte';

	// Use `data` prop passed by SvelteKit
	export let data: {
		projects: any[];
	};

	$: gaugeSize = data.projects.length <= 3 ? 25 : 12.5;

	onMount(() => {
		const interval = setInterval(
			async () => {
				const res = await fetch('/api/projects');
				if (res.ok) {
					data.projects = await res.json();
					console.log('Projects reloaded');
				} else {
					console.error('Failed to reload projects');
				}
			},
			2 * 60 * 1000
		); // every 2 min

		return () => clearInterval(interval);
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
					<ProjectCard {project} {gaugeSize} />
				</div>
			{/each}
		</div>
	</div>
</main>
