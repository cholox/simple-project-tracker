<!-- src/lib/components/ProgressGauge.svelte -->
<script>
    export let progress = 0;
    export let size = 80;
    
    // Ensure progress is between 0-100
    $: safeProgress = Math.min(100, Math.max(0, progress));
    
    // Calculate SVG parameters
    $: radius = size * 0.4;
    $: circumference = 2 * Math.PI * radius;
    $: strokeDashoffset = circumference - (safeProgress / 100) * circumference;
    
    // Calculate color based on progress
    $: color = getProgressColor(safeProgress);
    
    /**
	 * @param {number} progress
	 */
    function getProgressColor(progress) {
      // Color gradient from red (0%) to green (100%)
      if (progress < 25) return "#ef4444"; // Red
      if (progress < 50) return "#f97316"; // Orange
      if (progress < 75) return "#eab308"; // Yellow
      return "#22c55e"; // Green
    }
  </script>
  
  <div class="flex items-center justify-center" style="width: {size}px; height: {size}px;">
    <div class="relative flex items-center justify-center">
      <!-- Background circle -->
      <svg width={size} height={size} viewBox="0 0 {size} {size}">
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius}
          stroke="#e5e7eb"
          stroke-width="5"
          fill="none"
        />
        <!-- Progress circle -->
        <circle 
          cx={size/2} 
          cy={size/2} 
          r={radius}
          stroke={color}
          stroke-width="5"
          stroke-linecap="round"
          fill="none"
          stroke-dasharray={circumference}
          stroke-dashoffset={strokeDashoffset}
          transform="rotate(-90 {size/2} {size/2})"
        />
      </svg>
      <!-- Percentage text -->
      <div class="absolute">
        <span class="text-sm font-semibold" style="color: {color}">{safeProgress}%</span>
      </div>
    </div>
  </div>