<script setup lang="ts">
const session = useUserSession();
definePageMeta({
  middleware: ["auth"],
});
</script>
<template>
  <div class="w-full">
    <ChatEmpty label="Choose an existing chat or start a new conversation." />
  </div>
</template>
