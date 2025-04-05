<script setup lang="ts">
const selectedIcon = defineModel({ default: null });
const selectedColor = defineModel("color", { default: "red" });

const displayIconName = computed(() => selectedIcon.value || "SquaresPlusIcon");
</script>

<template>
  <DPopover>
    <template #trigger>
      <DButton
        variant="secondary"
        :aria-label="
          selectedIcon ? `Selected icon: ${selectedIcon}` : 'Select an icon'
        "
      >
        <template #leading>
          <DIcon
            :name="displayIconName"
            :color="selectedColor"
            class="h-4 w-4"
          />
        </template>
      </DButton>
    </template>

    <div class="p-1 flex flex-col">
      <DIconPicker v-model="selectedIcon" :color="selectedColor" />
      <div class="border-t border-neutral"></div>
      <DColorPicker v-model="selectedColor" />
    </div>
  </DPopover>
</template>
