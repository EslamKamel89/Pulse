<script setup lang="ts">
import type { Message } from "~/types/db";

const props = defineProps<{
  messages: Message[];
}>();
const bottomDiv = ref<HTMLDivElement | null>(null);
</script>
<template>
  <div class="my-4 flex flex-col space-y-2">
    <ConversationChatBubble
      v-for="message in messages"
      :key="message.id"
      :message
    />
    <div ref="bottomDev" class="w-2 bg-green-500 pt-24"></div>
  </div>
</template>
