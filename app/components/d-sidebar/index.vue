<script setup lang="ts">
import {
  InboxIcon,
  PlusIcon,
  UsersIcon,
  PencilIcon,
  CheckCircleIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  PaintBrushIcon,
  ComputerDesktopIcon,
  Cog6ToothIcon,
  HashtagIcon,
} from "@heroicons/vue/16/solid";
import { ChevronsUpDownIcon } from "lucide-vue-next";

const { data: lists, refresh: refreshLists } = await useFetch("/api/lists");

const listName = ref("");
const listIcon = ref("Hashtag");
const listColor = ref("");

const isCreateModalOpen = ref(false);
const listNameInput = ref();

function openCreateModal() {
  isCreateModalOpen.value = true;
}

function closeCreateModal() {
  isCreateModalOpen.value = false;
  listName.value = "";
  listIcon.value = "Hashtag";
  refreshLists();
}

watch(isCreateModalOpen, async (isOpen) => {
  if (isOpen) {
    await nextTick();
    listNameInput.value?.focus?.();
  }
});

async function createList() {
  console.log("Creating list" + listName.value);

  const result = await $fetch("/api/lists", {
    method: "POST",
    body: {
      name: listName.value,
      icon: listIcon.value,
      color: listColor.value,
    },
  });
  closeCreateModal();
}
</script>
<template>
  <div class="py-4 px-3 w-[270px] flex flex-col">
    <div class="flex flex-col gap-4 flex-1">
      <button
        class="w-full text-neutral px-2 rounded-md h-10 relative group focus-visible:ring-neutral-300 focus-visible:ring-2 outline-none"
      >
        <DHover />
        <div class="z-10 flex items-center justify-between relative">
          <div class="flex items-center gap-2 select-none">
            <div
              class="size-6 rounded-md bg-neutral-900 grid place-items-center"
            >
              <div class="size-2 bg-neutral rounded-xs rotate-45"></div>
            </div>
            <p class="text-copy">Acme GmbH</p>
          </div>
          <div class="size-7 grid place-items-center">
            <ChevronsUpDownIcon class="size-4" />
          </div>
        </div>
      </button>

      <div class="flex flex-col gap-1">
        <DSidebarLink name="Inbox" link="/" :icon="InboxIcon" />
        <DSidebarLink name="Drafts" link="#" :icon="PencilIcon" />
        <DSidebarLink name="Assigned to me" link="#" :icon="CheckCircleIcon" />
      </div>
      <div class="flex flex-col gap-1">
        <p class="px-2 text-copy-sm text-neutral-subtle">Lists</p>
        <DSidebarLink
          name="Create List"
          :icon="PlusIcon"
          @click="openCreateModal"
        />
        <template v-if="lists && lists.length > 0" v-for="list in lists">
          <DSidebarLink
            :name="list.title"
            :link="`/lists/${list.id}`"
            :iconName="list.icon"
            :color="list.color"
          />
        </template>
      </div>
    </div>
    <div>
      <DSidebarLink name="Settings" link="/settings" :icon="Cog6ToothIcon" />
    </div>
  </div>
  <DModal
    :open="isCreateModalOpen"
    title="New list"
    @close="closeCreateModal"
    no-padding
    no-line
    size="sm"
  >
    <form
      class="p-2 bg-neutral-subtle rounded-sm flex items-center gap-1"
      @submit.prevent="createList"
    >
      <DIconPickerPopover v-model="listIcon" v-model:color="listColor" />
      <DInput
        ref="listNameInput"
        v-model="listName"
        class="flex-grow"
        placeholder="List name"
      />
      <DButton type="submit">Create list</DButton>
    </form>
  </DModal>
</template>
