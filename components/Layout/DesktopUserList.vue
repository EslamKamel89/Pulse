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
        <div v-if="pending || true" class="space-y-4">
          <div class="flex items-center gap-4" v-for="i in 5" :key="i">
            <USkeleton class="h-8 w-8 rounded-full" />

            <div class="grid gap-2">
              <USkeleton class="h-4 w-[150px]" />
              <USkeleton class="h-4 w-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
