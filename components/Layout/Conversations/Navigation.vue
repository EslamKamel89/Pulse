<script setup lang="ts">
const { conversations, conversationsStatus } = useConversations();
</script>
<template>
  <div
    class="flex min-h-full w-fit flex-col self-stretch bg-gray-100 dark:bg-gray-900"
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
          :pending="conversationsStatus == 'pending'"
          :is-desktop="false"
        />
      </template>
    </UDrawer>
    <LayoutConversationsList
      :conversations="conversations ?? []"
      :pending="conversationsStatus == 'pending'"
      :is-desktop="true"
    />
  </div>
</template>
