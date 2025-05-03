<script setup lang="ts">
defineProps<{
  buttonLabel: string;
}>();
</script>
<template>
  <div class="">
    <div class="my-4 flex items-center justify-center gap-2">
      <UiSeparator />
      <div>OR</div>
      <UiSeparator />
    </div>
    <a href="/api/auth/github">
      <UButton
        :label="buttonLabel"
        icon="i-lucide-github"
        class="flex w-full justify-center"
      />
    </a>
  </div>
</template>
