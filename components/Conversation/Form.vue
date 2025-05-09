<script setup lang="ts">
import { SendHorizontal } from "lucide-vue-next";
import { ref } from "vue";

const message = ref<string>("");

const handleSendMessage = () => {
  if (!message.value?.trim()) return;

  // Emit or call API to send message
  console.log("Sending message:", message.value);
  message.value = ""; // Clear input after sending
};
</script>
<template>
  <div class="w-full border-t border-gray-200 px-4 py-3 dark:border-gray-700">
    <form @submit.prevent="handleSendMessage" class="flex items-center gap-2">
      <!-- Message Input -->
      <UInput
        v-model="message"
        type="text"
        placeholder="Type a message..."
        autocomplete="off"
        class="flex-1 rounded-xl border-gray-300 bg-gray-100 px-3 py-3 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
      />

      <!-- Send Button -->
      <button
        type="submit"
        :disabled="!message || message.trim() === ''"
        class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 p-2 text-white shadow-md transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50 disabled:hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-600"
        aria-label="Send message"
      >
        <SendHorizontal />
      </button>
    </form>
  </div>
</template>
