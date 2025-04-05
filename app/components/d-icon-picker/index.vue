<script setup lang="ts">
import { ref, computed } from "vue";
import * as solidIcons from "@heroicons/vue/16/solid";

const props = defineProps<{
  modelValue: string | null;
  color: string | null;
}>();

const emit = defineEmits(["update:modelValue"]);
const searchQuery = ref("");

const allIconNames = Object.keys(solidIcons)
  .filter((key) => key.endsWith("Icon") && key !== "default")
  .map((key) => key.replace(/Icon$/, ""))
  .sort();

const filteredIconNames = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return allIconNames;
  return allIconNames.filter((name) => name.toLowerCase().includes(query));
});

function selectIcon(name: string) {
  emit("update:modelValue", name);
}
</script>

<template>
  <div class="flex flex-col gap-1 w-[200px]">
    <DInput v-model="searchQuery" placeholder="Search icons..." />

    <div class="grid grid-cols-6 gap-1 max-h-40 overflow-y-auto p-1">
      <button
        v-for="name in filteredIconNames"
        :key="name"
        type="button"
        class="flex items-center justify-center w-full aspect-square rounded text-neutral hover:bg-neutral-hover"
        :class="{
          'bg-neutral-strong': name === modelValue,
        }"
        :title="name"
        @click="selectIcon(name)"
      >
        <DIcon :name="name" :color="color" class="h-4 w-4" />
      </button>

      <p
        v-if="filteredIconNames.length === 0 && searchQuery"
        class="col-span-full text-center text-sm text-neutral-subtle py-4"
      >
        No icons found matching "{{ searchQuery }}"
      </p>
    </div>
  </div>
</template>
