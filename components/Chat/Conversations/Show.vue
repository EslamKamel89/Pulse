<script setup lang="ts">
import type { User } from "~/types/db";
defineProps<{
  user: User;
}>();
include: {
  users: true;
}
</script>
<template>
  <div></div>
</template>
