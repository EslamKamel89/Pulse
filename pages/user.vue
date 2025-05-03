<template>
  <div>{{ session.user.value ?? "not defined" }}</div>
</template>

<script setup lang="ts">
const session = useUserSession();
definePageMeta({
  middleware: ["auth"],
});
</script>
