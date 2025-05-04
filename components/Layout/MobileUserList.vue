<script setup lang="ts">
import type { User } from "~/types/db";

defineProps<{
  users: User[];
  pending: boolean;
}>();
</script>
<template>
  <div class="fixed inset-x-0 bottom-0 z-40 pb-16 lg:hidden">hello world</div>
</template>
