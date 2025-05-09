<template>
  <div class="h-full w-full">
    <ConversationsCreateOrSelect />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "conversations",
  middleware: ["auth"],
});
</script>

<style scoped></style>
