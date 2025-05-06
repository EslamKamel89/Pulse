<script setup lang="ts">
const uploadedAvatarURL = ref<string | null>();
const open = ref(false);
const { setLoading, setAppError } = useStore();
const handleFileSelected = async (file: File | null) => {
  pr(file, "modal.vue - file selected");
  setLoading(true);
  uploadedAvatarURL.value = await fileUpload(file, "useravatar");
  setLoading(false);
};
const closeModal = () => {
  open.value = false;
};
// const handleSubmit
</script>
<template>
  <UModal
    v-model:open="open"
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
      <div class="flex space-x-2">
        <UButton @click="closeModal" color="error">Cancel</UButton>
        <UButton @click="closeModal" color="primary">Save</UButton>
      </div>
    </template>
  </UModal>
</template>
