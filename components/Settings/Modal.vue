<script setup lang="ts"></script>
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
      <SharedImageUpload title="Upload Your Avatar" />
    </template>
  </UModal>
</template>
