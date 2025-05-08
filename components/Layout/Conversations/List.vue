<script setup lang="ts">
import type { Conversation } from "~/types/db";

defineProps<{
  conversations: Conversation[];
  pending: boolean;
  isDesktop: boolean;
}>();
</script>
<template>
  <div
    class="flex h-full min-h-full max-w-60 flex-1 flex-col lg:flex"
    :class="{ hidden: isDesktop }"
  >
    <div
      class="flex flex-1 flex-col justify-between overflow-y-auto border-r-[1px] bg-white px-4 pb-4 dark:border-gray-700 dark:bg-gray-900"
    >
      <div class="flex flex-col">
        <div class="py-4 text-2xl font-bold text-neutral-800 dark:text-white">
          Messages
        </div>
        <LayoutUsersListLoading v-if="pending" />
        <template v-else>
          <div class="space-y-4">
            <div
              class="flex items-center gap-4 rounded-lg px-1 py-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              v-for="conversation in conversations"
              :key="conversation.id"
            >
              <LayoutConversationsItem :conversation="conversation" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
