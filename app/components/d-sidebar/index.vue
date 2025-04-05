<script setup lang="ts">
import { ChevronUpDownIcon } from "@heroicons/vue/24/solid";
</script>
<template>
  <div class="py-5 px-3 w-[270px]">
    <div class="flex items-center justify-between text-neutral px-2">
      <div class="flex items-center gap-2">
        <div class="size-6 rounded-md bg-neutral-900 grid place-items-center">
					<div class="size-2 bg-neutral rounded-xs rotate-45"></div>
				</div>
        <p class="text-copy">Acme GmbH</p>
      </div>
      <div>
        <DButton :icon-left="ChevronUpDownIcon" variant="ghost"></DButton>
      </div>
    </div>

    <div></div>
  </div>
</template>
