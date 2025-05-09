<!-- src/lib/components/ProjectCard.svelte -->
<script>
    import { Icon, CheckCircle, UserCircle, Star } from 'svelte-hero-icons';
    import { projectUtils } from '$lib/stores/projects';
    import ProgressGauge from './ProgressGauge.svelte';
  
    // Props
    export let project;
  
    // Destructure project utils
    const { calculateDays, getMoneyLevelSymbol, getCardColor, getProgressColor } = projectUtils;
  </script>
  
  <div class="rounded-lg border shadow-sm overflow-hidden {getCardColor(project.importance)} transition-all duration-200 hover:shadow-md">
    <div class="p-5">
      <!-- Project Name -->
      <h3 class="text-lg font-medium text-gray-800 mb-2">{project.name}</h3>
      
      <!-- Project Duration -->
      <div class="flex items-center mb-3 text-sm text-gray-600">
        <span class="mr-1">Duration:</span>
        <span class="font-medium">{calculateDays(project.start_date, project.end_date)} days</span>
      </div>
      
      <!-- Progress Gauge -->
      <div class="mb-4 flex items-center justify-between">
        <span class="text-sm text-gray-600">Progress:</span>
        <div class="flex-shrink-0">
          <ProgressGauge progress={project.progress} size={70} />
        </div>
      </div>
      
      <!-- Project Details -->
      <div class="space-y-2">
        <!-- Money Level -->
        <div class="flex items-center">
          <span class="w-24 text-sm text-gray-500">Budget:</span>
          <span class="font-medium text-gray-700">{getMoneyLevelSymbol(project.money_level)}</span>
        </div>
        
        <!-- Person in Charge -->
        <div class="flex items-center">
          <span class="w-24 text-sm text-gray-500">Manager:</span>
          <div class="flex items-center">
            <Icon src={UserCircle} class="h-4 w-4 text-gray-500 mr-1" />
            <span class="text-sm text-gray-700">{project.person_in_charge}</span>
          </div>
        </div>
        
        <!-- Past Customer & Promising Future -->
        <div class="flex space-x-4 mt-2">
          {#if project.past_customer}
            <div class="flex items-center">
              <Icon src={CheckCircle} class="h-5 w-5 text-blue-500 mr-1" />
              <span class="text-xs text-gray-600">Past Customer</span>
            </div>
          {/if}
          
          {#if project.promising_future}
            <div class="flex items-center">
              <Icon src={CheckCircle} class="h-5 w-5 text-green-500 mr-1" />
              <span class="text-xs text-gray-600">Promising Future</span>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>