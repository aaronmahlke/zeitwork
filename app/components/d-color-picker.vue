<script setup lang="ts">
import { ref } from "vue";

// Preload Tailwind classes
// bg-red-600 bg-orange-600 bg-amber-600 bg-yellow-600 bg-lime-600 bg-green-600
// bg-emerald-600 bg-teal-600 bg-cyan-600 bg-sky-600 bg-blue-600 bg-indigo-600
// bg-violet-600 bg-purple-600 bg-fuchsia-600 bg-pink-600 bg-rose-600

const colors = {
  red: { background: "bg-red-600" },
  orange: { background: "bg-orange-600" },
  amber: { background: "bg-amber-600" },
  yellow: { background: "bg-yellow-600" },
  lime: { background: "bg-lime-600" },
  green: { background: "bg-green-600" },
  emerald: { background: "bg-emerald-600" },
  teal: { background: "bg-teal-600" },
  cyan: { background: "bg-cyan-600" },
  sky: { background: "bg-sky-600" },
  blue: { background: "bg-blue-600" },
  indigo: { background: "bg-indigo-600" },
  violet: { background: "bg-violet-600" },
  purple: { background: "bg-purple-600" },
  fuchsia: { background: "bg-fuchsia-600" },
  pink: { background: "bg-pink-600" },
  rose: { background: "bg-rose-600" },
};

const selectedColorKey = defineModel<keyof typeof colors>({ default: "red" });
</script>
<template>
  <div class="grid grid-cols-6 gap-1 p-1">
    <button
      class="relative group grid place-items-center w-full aspect-square"
      v-for="(colorData, colorName) in colors"
      :key="colorName"
      @click="selectedColorKey = colorName"
      :aria-label="`Select ${colorName}`"
      type="button"
    >
      <DHover :is-active="colorName === selectedColorKey" />
      <div
        class="size-3 rounded-full cursor-pointer focus:outline-none relative z-10"
        :class="[colorData.background]"
      />
    </button>
  </div>
</template>
