<script setup lang="ts">
const session = useUserSession();
definePageMeta({
  middleware: ["auth"],
});
</script>
<template>
  <div
    class="w-full bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 lg:py-6 dark:bg-gray-900"
  >
    <ChatEmpty label="Select A chat or Start a new conversation" />
  </div>
</template>
