<script setup lang="ts">
import type { User } from "~/types/db";

const avatarUrl = ref<string | null>();
const open = ref(false);
const { setLoading, setAppError, showToast } = useStore();
const { fetch, user: currentUser } = useUserSession();
const user = computed(() => currentUser.value as User);
const handleFileSelected = async (file: File | null) => {
  pr(file, "modal.vue - file selected");
  setLoading(true);
  avatarUrl.value = await fileUpload(file, "useravatar");
  showToast({
    type: "success",
    message: "Your Avatar Uploaded Successfully",
  });
  setLoading(false);
};
const closeModal = () => {
  open.value = false;
};
const handleSubmit = async () => {
  setLoading(true);
  try {
    const user = await $fetch("/api/auth/profile", {
      method: "POST",
      body: { image: avatarUrl.value },
    });
    if (user) {
      showToast({
        type: "success",
        message: "Your Avatar Saved Successfully",
      });
      await fetch();
      open.value = false;
    } else {
      setAppError({
        statusMessage: "Something went wrong",
        message: "Something went wrong",
      });
    }
  } catch (error) {
    setAppError(handleApiError(error));
  } finally {
    setAppError(null);
    setLoading(false);
  }
};
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
      <div class="relative">
        <div class="absolute top-0 right-0">
          <SharedAvatar v-if="user && user.avatarUrl" :user="user" />
        </div>
        <SharedImageUpload
          title="Upload Your Avatar"
          @file-selected="(file) => handleFileSelected(file)"
          class=""
        />
        <div class="flex space-x-2">
          <UButton @click="closeModal" color="error">Cancel</UButton>
          <UButton @click="handleSubmit" color="primary">Save</UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
