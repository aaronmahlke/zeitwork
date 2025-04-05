<template>
  <div class="flex h-screen">
    <DSidebar />
    <div class="p-2 pl-0 flex-1">
      <div
        class="size-full bg-neutral-weak rounded-[4px] overflow-hidden border border-neutral"
      >
        <div class="overflow-auto h-full">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
