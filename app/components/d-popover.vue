<script setup lang="ts">
import { PopoverRoot, PopoverTrigger, PopoverContent } from "reka-ui";
</script>

<template>
  <PopoverRoot>
    <PopoverTrigger as-child>
      <slot name="trigger"></slot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        class="z-50 w-auto rounded-md border border-neutral bg-neutral p-0 text-neutral shadow-md outline-none motion-safe:animate-contentShow"
        :side-offset="4"
      >
        <slot></slot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
