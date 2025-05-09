<template>
  <UModal
    v-model:open="open"
    title="Upload Image"
    description="A picture sparks a thousand reactions! 🌟"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    close-icon="i-lucide-x"
  >
    <div
      class="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-300 focus:outline-none dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
    >
      <Icon name="ion:image-outline" size="20" />
    </div>

    <template #body>
      <div class="relative">
        <div class="absolute top-0 right-0">
          <SharedAvatar v-if="user && user.avatarUrl" :user="user" />
        </div>
        <SharedImageUpload
          title="Upload"
          @file-selected="handleFileSelect"
          class=""
        />
        <div class="flex space-x-2">
          <UButton @click="closeModal" color="success">Done</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import { useCreateMessage } from "~/composables/useCreateMessage";

const { open, user, handleFileSelect, closeModal } = useCreateMessage();
</script>
