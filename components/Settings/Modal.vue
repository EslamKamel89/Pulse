<script setup lang="ts">
const uploadedAvatar = ref<File>();
const uploadedAvatarURL = ref<string | null>();
const { setLoading, setAppError } = useStore();
const handleFileSelected = async (file: File | null) => {
  pr(file, "modal.vue - file selected");
  const fd = new FormData();
  if (file) fd.append("image", file);
  try {
    setLoading(true);
    const { url } = await $fetch<{ url: string | null }>(
      "/api/auth/useravatar",
      {
        method: "POST",
        body: fd,
      },
    );
    uploadedAvatarURL.value = url;
    pr(url, "uploadedAvatarUrl");
  } catch (error) {
    pr(error, "Error uplaoding user avatar");
    uploadedAvatarURL.value = null;
    setAppError(handleApiError(error));
  } finally {
    setLoading(false);
  }
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
