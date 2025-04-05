<script setup lang="ts">
import { NuxtLink } from "#components";
interface Props {
  name: string;
  link?: string;
  icon?: any;
  iconName?: string;
  color?: string;
}

const { name, link, icon, iconName } = defineProps<Props>();

const route = useRoute();

const isActive = computed(() => {
  if (!link) return false;
  return route.path.startsWith(link);
});

const component = computed(() => {
  return link ? NuxtLink : "button";
});

// text-red-600 text-orange-600 text-amber-600 text-yellow-600 text-lime-600 text-green-600
// text-emeral-600 text-teal-600 text-cyan-600 text-sky-600 text-blue-600 text-indigo-600
// text-violet-600 text-purple-600 text-fuchsia-600 text-pink-600 text-rose-600
</script>

<template>
  <component
    :is="component"
    :to="link"
    class="flex h-8 w-full items-center gap-2 px-2 text-sm font-medium text-neutral transition-all cursor-pointer relative group focus-visible:ring-neutral-300 focus-visible:ring-2 outline-none rounded-md"
  >
    <DHover :is-active="isActive" />
    <div class="flex gap-2 z-10">
      <div class="size-5 grid place-items-center">
        <component
          v-if="icon"
          :is="icon"
          class="size-4"
          :class="color ? `text-${color}-600` : 'text-neutral-subtle'"
        />
        <d-icon
          v-else-if="iconName"
          :name="iconName"
          class="size-4"
          :color="color"
        />
      </div>
      {{ name }}
    </div>
  </component>
</template>
