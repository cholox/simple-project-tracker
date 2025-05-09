<!-- src/lib/components/ProjectCard.svelte -->
<script>
	import { Icon, CheckCircle, UserCircle, Star } from 'svelte-hero-icons';
	import { projectUtils } from '$lib/stores/projects';
	import ProgressGauge from './ProgressGauge.svelte';

	// Props
	export let project;
    export let gaugeSize = 70; // Default if not passed

	// Destructure project utils
	const { calculateDays, getMoneyLevelSymbol, getCardColor, getProgressColor } = projectUtils;
</script>

<div
	class="rounded-lg border shadow-sm overflow-hidden {getCardColor(
		project.importance
	)} transition-all duration-200 hover:shadow-md w-full h-full"
>
	<div class="p-5 flex flex-col justify-between h-full">
		<div class="flex flex-col gap-0">
			<!-- Project Name -->
			<h3 class="text-3xl font-medium text-gray-800 mb-2">{project.name}</h3>

			<!-- Project Duration -->
			<div class="flex items-center mb-3 text-md text-gray-600">
				<span class="font-medium">{calculateDays(project.start_date, project.end_date)} días</span>
			</div>
		</div>

		<!-- Progress Gauge -->
		<div class="flex items-center justify-center w-full">
			<div class="flex-shrink-0">
				<ProgressGauge progress={project.progress} size={gaugeSize} />
			</div>
		</div>

		<!-- Project Details -->
		<div class="space-y-2 text-lg">
			<!-- Money Level -->
			<div class="flex items-center">
				<span class="font-medium text-gray-700">{getMoneyLevelSymbol(project.money_level)}</span>
			</div>

			<!-- Person in Charge -->
			<div class="flex items-center">
				<div class="flex items-center">
					<Icon src={UserCircle} class="h-4 w-4 text-gray-500 mr-1" />
					<span class="text-gray-700">{project.person_in_charge}</span>
				</div>
			</div>

			<!-- Past Customer & Promising Future -->
			<div class="flex space-x-4 mt-2">
				{#if project.past_customer}
					<div class="flex items-center">
						<Icon src={CheckCircle} class="h-5 w-5 text-blue-500 mr-1" />
						<span class="text-gray-600">Past Customer</span>
					</div>
				{/if}

				{#if project.promising_future}
					<div class="flex items-center">
						<Icon src={CheckCircle} class="h-5 w-5 text-green-500 mr-1" />
						<span class="text-gray-600">Promising Future</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
