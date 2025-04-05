<script setup lang="ts">
type Props = {
  isActive?: boolean;
};
const { isActive = false } = defineProps<Props>();
</script>
<template>
  <div
    class="bg-neutral-strong size-full absolute inset-0 rounded-md transition-all"
    :class="
      isActive
        ? 'scale-100'
        : 'group-hover:scale-100 group-hover:opacity-100 scale-90 opacity-0'
    "
  ></div>
</template>
