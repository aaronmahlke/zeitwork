<script setup lang="ts">
import * as solidIcons from "@heroicons/vue/16/solid";

type Props = {
  name: string;
  color?: string;
};

const props = defineProps<Props>();

const dynamicIcon = computed(() => {
  const name = props.name;
  if (!name) return null;

  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const iconComponentName = `${capitalizedName}Icon`;

  const component = (solidIcons as Record<string, Component>)[
    iconComponentName
  ];

  if (!component) {
    console.error(
      `Icon "${iconComponentName}" not found in @heroicons/vue/16/solid`,
    );
    return null;
  }

  return component;
});

// text-red-600 text-orange-600 text-amber-600 text-yellow-600 text-lime-600 text-green-600
// text-emeral-600 text-teal-600 text-cyan-600 text-sky-600 text-blue-600 text-indigo-600
// text-violet-600 text-purple-600 text-fuchsia-600 text-pink-600 text-rose-600
</script>

<template>
  <component
    :is="dynamicIcon"
    v-if="dynamicIcon"
    class="size-4"
    :class="color ? `text-${color}-600` : 'text-neutral-subtle'"
  />
</template>
