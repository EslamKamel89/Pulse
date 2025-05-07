<template>
  <div class="overflow-y-auto">
    <pre>{{ conversations }}</pre>
  </div>
</template>

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
</script>
