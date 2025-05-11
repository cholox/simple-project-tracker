<!-- src/routes/+page.svelte -->
<script lang="ts">
	import ProjectCard from '$lib/components/ProjectCard.svelte';
	
	// Use `data` prop passed by SvelteKit
	export let data: {
		projects: any[];
	};

	$: gaugeSize = data.projects.length <= 3 ? 25 : 12.5;
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
