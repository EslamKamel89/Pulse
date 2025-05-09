<script setup lang="ts">
import type { Conversation } from "~/types/db";

const props = defineProps<{
  conversation: Conversation;
  selected?: boolean;
}>();
const { setLoading, setAppError, showToast } = useStore();
const { user: existingUser } = await useUserSession();
const otherUser = computed(() => {
  return props.conversation.users?.find(
    (user) => user.id != existingUser.value?.id,
  );
});
const lastMessage = computed(() => {
  const messages = props.conversation?.messaages;
  if (!messages || messages?.length) return null;
  return messages[messages.length - 1];
});
const lastMessageText = computed(() => {
  if (lastMessage.value?.image) {
    return "Sent An Attachement";
  }
  return lastMessage.value?.body ?? "Started a conversation";
});
const handleClick = async () => {
  await navigateTo(`/conversations/${props.conversation.id}`);
};
</script>
<template>
  <div
    class="flex items-center gap-4 rounded-lg px-1 py-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-800"
    :class="{ 'bg-gray-100 dark:bg-gray-800': selected }"
    @click="handleClick"
  >
    <div class="flex space-x-2">
      <div
        class="flex h-8 w-8 items-center justify-center rounded-full shadow-md"
      >
        <SharedAvatar :user="otherUser ?? null" />
      </div>

      <div class="grid gap-1">
        <div class="flex w-full items-center justify-between">
          <div class="h-4 overflow-clip text-sm">
            {{
              conversation.isGroup && conversation.name
                ? conversation.name
                : otherUser?.name
            }}
          </div>
          <div
            v-if="conversation.lastMessageAt"
            class="mx-2 text-xs font-thin text-gray-500"
          >
            {{ useDateFormat(conversation.lastMessageAt, "hh:mm A") }}
          </div>
        </div>
        <div class="h-4 w-[150px] overflow-clip text-xs font-thin">
          {{ lastMessageText }}
        </div>
      </div>
    </div>
  </div>
</template>
