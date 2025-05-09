<script setup lang="ts">
const props = defineProps<{
  title?: string;
  description?: string;
  yesColor?:
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "error"
    | "neutral"
    | undefined;
}>();
const emit = defineEmits<{
  close: [confirm: boolean];
}>();
</script>
<template>
  <UModal
    :close="{
      onClick: () => emit('close', false),
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full transition-transform hover:scale-105',
    }"
    :title="title ?? 'Are you sure?'"
    :description="description"
    class="transition-all duration-300"
  >
    <!-- Modal Header -->
    <template #header>
      <div>
        <div class="flex w-full items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ title ?? "Are you sure?" }}
          </h3>
          <UButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            color="neutral"
            rounded
            @click="emit('close', false)"
            class="hover:bg-gray-200 dark:hover:bg-gray-700"
          />
        </div>
        <p v-if="description" class="text-sm text-gray-600 dark:text-gray-300">
          {{ description }}
        </p>
      </div>
    </template>

    <!-- Modal Footer -->
    <template #footer>
      <div class="flex w-full justify-end gap-3 pt-4">
        <UButton
          label="Cancel"
          color="neutral"
          variant="outline"
          rounded
          @click="emit('close', false)"
          class="px-4 py-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        />
        <UButton
          label="Confirm"
          :color="yesColor ?? 'error'"
          rounded
          @click="emit('close', true)"
          class="px-4 py-2 font-medium transition-transform hover:scale-[1.02] active:scale-95"
        />
      </div>
    </template>
  </UModal>
</template>
