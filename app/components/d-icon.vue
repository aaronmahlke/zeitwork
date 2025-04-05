<script setup lang="ts">
import * as solidIcons from "@heroicons/vue/16/solid";

type Props = {
  name: string;
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
</script>

<template>
  <component :is="dynamicIcon" v-if="dynamicIcon" class="size-4" />
</template>
