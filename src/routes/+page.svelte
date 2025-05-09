<!-- src/routes/+page.svelte -->
<script>
    import { projects } from '$lib/stores/projects';
    import ProjectCard from '$lib/components/ProjectCard.svelte';
  </script>
  
  <svelte:head>
    <title>Project Tracker</title>
  </svelte:head>
  
  <main class="min-h-screen bg-slate-100 py-8 px-4 sm:px-6 lg:px-8">
    <div class="mx-auto">
      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each $projects as project (project.id)}
          <ProjectCard {project} />
        {/each}
      </div>
    </div>
  </main>