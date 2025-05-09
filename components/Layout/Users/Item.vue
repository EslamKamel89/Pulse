<script setup lang="ts">
import type { Conversation, User } from "~/types/db";

const props = defineProps<{ user: User }>();
const { setLoading, setAppError, showToast } = useStore();

const handleClick = async () => {
  try {
    setLoading(true);
    const conversation = await $fetch<Conversation>("/api/conversations", {
      method: "POST",
      body: { userId: props.user.id },
    });

    if (!conversation) {
      setAppError({
        message: "Unknown error occurred",
        statusMessage: "Unknown error occurred",
      });
    } else {
      // You can replace this with a proper action like navigating to the conversation
      console.log("New conversation created:", conversation);
      // Example redirect:
      // navigateTo(`/conversations/${conversation.id}`);
    }
  } catch (error) {
    setAppError(handleApiError(error));
  } finally {
    setLoading(false);
  }
};
</script>
<template>
  <div
    class="group flex w-full cursor-pointer items-center gap-4 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
    @click="handleClick"
  >
    <!-- Avatar -->
    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200 transition-transform duration-300 group-hover:scale-105 dark:bg-gray-700 dark:ring-gray-600"
    >
      <SharedAvatar :user="user" />
    </div>

    <!-- User Info -->
    <div class="min-w-0 flex-1">
      <h3
        class="truncate text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        {{ user.name }}
      </h3>
      <p class="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
        {{ user.email }}
      </p>
    </div>
  </div>
</template>
