<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="flex flex-col items-center text-center">
      <h3 class="mt-2 font-semibold text-gray-900 dark:text-white">
        {{ label }}
      </h3>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>
<style scoped></style>
