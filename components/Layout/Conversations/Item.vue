<script setup lang="ts">
import { useDateFormat } from "#imports";
import { computed } from "vue";
import type { Conversation } from "~/types/db";

const props = defineProps<{
  conversation: Conversation;
  selected?: boolean;
}>();

const { setLoading, setAppError, showToast } = useStore();
const { user: existingUser } = await useUserSession();

const otherUser = computed(() => {
  return props.conversation.users?.find(
    (user) => user.id !== existingUser.value?.id,
  );
});

const lastMessage = computed(() => {
  const messages = props.conversation.messaages; // Note: typo in prop name? Should be `messages`?
  if (!messages || messages.length === 0) return null;
  return messages[messages.length - 1];
});

const lastMessageText = computed(() => {
  if (lastMessage.value?.image) {
    return "Sent an attachment";
  }
  return lastMessage.value?.body ?? "Started a conversation";
});

const handleClick = async () => {
  await navigateTo(`/conversations/${props.conversation.id}`);
};
</script>
<template>
  <div
    class="group dark:hover:bg-gray-850 relative flex cursor-pointer items-center gap-4 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-gray-200 hover:shadow-md dark:hover:border-gray-700"
    :class="{ 'bg-gray-100 dark:bg-gray-800': selected }"
    @click="handleClick"
  >
    <!-- Avatar -->
    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-transform duration-300 group-hover:scale-105 dark:bg-gray-700 dark:ring-gray-600"
    >
      <SharedAvatar :user="otherUser ?? null" />
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="flex items-center justify-between">
        <h3
          class="truncate text-sm font-semibold text-gray-800 dark:text-gray-200"
        >
          {{
            conversation.isGroup && conversation.name
              ? conversation.name
              : otherUser?.name
          }}
        </h3>
        <span
          v-if="conversation.lastMessageAt"
          class="ml-2 flex-shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400"
        >
          {{ useDateFormat(conversation.lastMessageAt, "hh:mm A") }}
        </span>
      </div>

      <p class="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
        {{ lastMessageText }}
      </p>
    </div>

    <!-- Selected indicator -->
    <div
      v-if="selected"
      class="absolute top-0 right-0 bottom-0 w-1 rounded-r-lg bg-blue-500"
    ></div>
  </div>
</template>
