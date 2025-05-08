<script setup lang="ts">
import type { UseFetchKey } from "~/types";
import type { Conversation } from "~/types/db";

const {
  data: conversations,
  status,
  execute,
} = await useFetch<Conversation[]>("/api/conversations", {
  lazy: true,
  server: false,
  immediate: false,
  key: "conversations" as UseFetchKey,
});
onMounted(() => {
  execute();
});
watchEffect(() => {
  if (!conversations.value) conversations.value = [];
});
</script>
<template>
  <div
    class="flex min-h-full w-min flex-col self-stretch bg-gray-100 dark:bg-gray-900"
  >
    <UDrawer direction="left">
      <div class="block w-fit lg:hidden">
        <UButton
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-align-left"
          class="m-2"
        />
      </div>

      <template #content>
        <LayoutConversationsList
          :conversations="conversations ?? []"
          :pending="status == 'pending'"
          :is-desktop="false"
        />
      </template>
    </UDrawer>
    <LayoutConversationsList
      :conversations="conversations ?? []"
      :pending="status == 'pending'"
      :is-desktop="true"
    />
  </div>
</template>
