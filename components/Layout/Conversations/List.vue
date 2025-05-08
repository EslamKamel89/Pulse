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
        <div class="flex justify-between py-4 text-neutral-800 dark:text-white">
          <div class="text-2xl font-bold">Messages</div>
          <UButton
            icon="i-lucide-user-plus"
            color="neutral"
            variant="soft"
            class="rounded-full"
            size="sm"
            :ui="{
              leadingIcon: 'text-primary',
            }"
          >
          </UButton>
        </div>
        <LayoutUsersListLoading v-if="pending" />
        <template v-else>
          <div class="space-y-4">
            <div
              class="w-full"
              v-for="conversation in conversations"
              :key="conversation.id"
            >
              <LayoutConversationsItem
                :conversation="conversation"
                :selected="false"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
