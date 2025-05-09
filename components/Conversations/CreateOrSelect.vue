<template>
  <div class="h-full w-full">
    <div class="mt-16 flex flex-col items-center justify-center space-y-3">
      <div>Select A Conversation</div>
      <div class="font-bold">OR</div>
      <LayoutConversationsGroupChatModel :users="users ?? []">
        <UButton
          icon="i-lucide-user-plus"
          color="neutral"
          variant="soft"
          label="Create New Conversation"
          size="sm"
          :ui="{
            leadingIcon: 'text-primary',
          }"
        >
        </UButton>
      </LayoutConversationsGroupChatModel>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UseFetchKey } from "~/types";
import type { User } from "~/types/db";
const { data: users } = useNuxtData<User[]>("users" as UseFetchKey);

onMounted(() => {});
</script>
