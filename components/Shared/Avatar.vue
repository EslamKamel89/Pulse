<script setup lang="ts">
import type { User } from "~/types/db";

const props = defineProps<{
  user: User | null;
}>();
const isActive = computed(() => {
  return true ? "success" : "seccondary";
});
</script>
<template>
  <div class="flex items-center justify-center">
    <UTooltip :text="user?.name">
      <UChip inset :color="isActive">
        <UAvatar :src="user?.avatarUrl ?? ''" :alt="user?.name ?? ''" />
      </UChip>
    </UTooltip>
  </div>
</template>
