<template>
  <div class="mt-20 flex h-full w-full items-center justify-center">
    <div class="flex flex-col items-center text-center">
      <h3 class="font-semibold text-gray-900 dark:text-white">
        {{ label }}
      </h3>
      <NuxtLink to="/conversations">
        <UButton class="mt-2">Browse Conversations</UButton>
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
<style scoped></style>
