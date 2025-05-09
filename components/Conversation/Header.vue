<script setup lang="ts">
import type { Conversation } from "~/types/db";

const props = defineProps<{
  conversation: Conversation;
}>();
const { user } = useUserSession();
const otherUsers = computed(() => {
  return props.conversation.users?.filter((u) => u.id != user.value?.id) ?? [];
});
</script>
<template>
  <div
    class="flex w-full items-center justify-between border-b-[1px] bg-white px-4 py-3 shadow-sm sm:px-4 lg:px-6 dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="flex items-center gap-3">
      <NuxtLink
        to="/conversations"
        class="text-primary hover:text-primary/70 block cursor-pointer transition lg:hidden"
      >
        <Icon name="heroicons:chevron-left" size="20" />
      </NuxtLink>
    </div>
  </div>
</template>
