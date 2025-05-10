<script setup lang="ts">
const route = useRoute();
const conversationId = computed(() => Number(route.params.conversationId));
const { conversations } = useConversations();
const conversation = computed(() =>
  conversations.value?.find(
    (conversation) => conversation.id == conversationId.value,
  ),
);
//! seo and head
definePageMeta({
  middleware: ["auth"],
  layout: "conversations",
});
useHead({
  title: "Conversation | Messenger",
});
</script>
<template>
  <div class="flex h-full flex-col pb-12 lg:pb-4">
    <div class="flex flex-1 flex-col">
      <ConversationHeader v-if="conversation" :conversation="conversation" />
      <div class="flex-1 overflow-y-auto">
        <ConversationList :messages="conversation?.messages ?? []" />
      </div>
      <ConversationForm />
      <div class="h-20 lg:h-0"></div>
    </div>
  </div>
</template>
