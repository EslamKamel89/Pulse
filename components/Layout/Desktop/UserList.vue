<script setup lang="ts">
import type { User } from "~/types/db";

defineProps<{
  users: User[];
  pending: boolean;
}>();
</script>
<template>
  <div class="flex h-full max-w-60 flex-col">
    <div
      class="hidden flex-1 justify-between px-4 lg:flex lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6 dark:border-gray-700 dark:bg-gray-900"
    >
      <div class="flex flex-col">
        <div class="py-4 text-2xl font-bold text-neutral-800 dark:text-white">
          People
        </div>
        <LayoutDesktopUserListLoading v-if="pending" />
      </div>
    </div>
  </div>
</template>
