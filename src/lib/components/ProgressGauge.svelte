<script>
    export let progress = 0;
    export let size = 12.5; // default size in px for mid-size screens
  
    $: safeProgress = Math.min(100, Math.max(0, progress));
    $: radius = 100 * 0.4;
    $: circumference = 2 * Math.PI * radius;
    $: strokeDashoffset = circumference - (safeProgress / 100) * circumference;
    $: color = getProgressColor(safeProgress);
    $: fontSize = Math.max(size * 0.15, 12); // responsive text inside gauge
  
    /**
	 * @param {number} progress
	 */
    function getProgressColor(progress) {
      if (progress < 25) return "#ef4444";
      if (progress < 50) return "#f97316";
      if (progress < 75) return "#eab308";
      return "#22c55e";
    }
  </script>
  
  <!-- Clamp size for responsiveness: min 60px, preferred size, max 200px -->
  <div
    class="flex items-center justify-center"
    style="width: clamp(4rem, {size}rem, 25rem); height: clamp(4rem, {size}rem, 25rem);"
  >
    <div class="relative w-full h-full">
      <svg viewBox="0 0 100 100" class="w-full h-full">
        <!-- Background -->
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="#e5e7eb"
          stroke-width="5"
          fill="none"
        />
        <!-- Foreground -->
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          stroke-width="5"
          stroke-linecap="round"
          fill="none"
          stroke-dasharray={circumference}
          stroke-dashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <!-- Text inside circle -->
      <div
        class="absolute inset-0 flex items-center justify-center"
        style="font-size: {fontSize}px; color: {color};"
      >
        <span class="font-semibold">{safeProgress}%</span>
      </div>
    </div>
  </div>
  