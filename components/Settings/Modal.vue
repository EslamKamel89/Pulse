<script setup lang="ts">
const uploadedAvatar = ref<File>();
const handleFileSelected = async (file: File | null) => {
  pr(file, "modal.vue - file selected");
};
</script>
<template>
  <UModal
    title="User Profile"
    description="Manage your account, privacy, notifications, and other preferences to customize your experience in the app."
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    close-icon="i-lucide-x"
  >
    <slot />

    <template #body>
      <SharedImageUpload
        title="Upload Your Avatar"
        @file-selected="(file) => handleFileSelected(file)"
      />
    </template>
  </UModal>
</template>
