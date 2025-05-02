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
    <div>
      <UButton
        :label="buttonLabel"
        icon="i-lucide-github"
        class="flex w-full justify-center"
      />
    </div>
  </div>
</template>
