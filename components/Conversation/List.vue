<script setup lang="ts">
import type { Message } from "~/types/db";

const props = defineProps<{
  messages: Message[];
}>();
const { bottomDiv } = useConversations();
watch(
  () => props.messages,
  async () => {
    await nextTick();
    bottomDiv.value?.scrollTo();
  },
);
const testFunc = async () => {
  pr(props.messages.length, "bottomDiv.value?.scrollIntoView()");
  await nextTick();
  pr(bottomDiv.value, "bottomDiv.value?.scrollIntoView() - div");
  bottomDiv.value?.scrollTo({ behavior: "auto" });
};
</script>
<template>
  <UButton @click="testFunc">Scroll to bottom</UButton>
  <div class="my-4 flex flex-col space-y-2">
    <ConversationChatBubble
      v-for="message in messages"
      :key="message.id"
      :message
    />
    <div ref="bottomDiv" class="w-2 bg-green-500 pt-24"></div>
  </div>
</template>
