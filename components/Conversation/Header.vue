<script setup lang="ts">
import type { Conversation, User } from "~/types/db";

const props = defineProps<{
  conversation: Conversation;
}>();
const user = ref(useUserSession().user.value as User);
const otherUsers = computed(() => {
  return props.conversation.users?.filter((u) => u.id != user.value?.id) ?? [];
});
const isActive = computed(() => {
  return false;
});
const statusText = computed(() => {
  if (props.conversation.isGroup) {
    const length = props.conversation.users?.length;
    return length ? `${length} members` : "";
  }
  return isActive.value ? "onLine" : "offLine";
});
const title = computed(() => {
  return (
    (props.conversation.isGroup && props.conversation.name
      ? props.conversation.name
      : otherUsers.value[0].name) ?? ""
  );
});
</script>
<template>
  <div
    class="flex w-full items-center justify-between border-b-[1px] bg-white px-4 pb-3 shadow-sm lg:px-6 lg:py-3 dark:border-gray-700 dark:bg-gray-900"
  >
    <div class="flex items-center gap-3">
      <NuxtLink
        to="/conversations"
        class="text-primary hover:text-primary/70 block cursor-pointer transition lg:hidden"
      >
        <Icon name="heroicons:chevron-left" size="20" />
      </NuxtLink>
      <SharedAvatar :user="otherUsers[0]" />
      <div class="flex flex-col">
        <div>
          {{ title }}
        </div>
        <div class="text-sm font-light text-neutral-500">
          {{ statusText }}
        </div>
      </div>
    </div>
    <div>
      <ConversationInfo
        :title
        :conversation
        :user
        :other-users
        :is-active
        :status-text
      />
    </div>
  </div>
</template>
