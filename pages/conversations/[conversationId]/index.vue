<script setup lang="ts">
import type { UseFetchKey } from "~/types";
import type { Conversation } from "~/types/db";

const route = useRoute();
const conversationId = computed(() => Number(route.params.conversationId));
const { data: conversations } = useNuxtData<Conversation[]>(
  "conversations" as UseFetchKey,
);
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
  <div>
    <ConversationHeader v-if="conversation" :conversation="conversation" />
  </div>
</template>
