<script setup lang="ts">
import { Ellipsis, X } from "lucide-vue-next";
import { ref } from "vue";
import type { Conversation, User } from "~/types/db";
import Avatar from "../Shared/Avatar.vue";

const props = defineProps<{
  title: string;
  conversation: Conversation;
  user: User | null;
  otherUsers: User[];
  isActive: boolean;
  statusText: string;
}>();

const isOpen = ref(false);

// Helper function for date formatting
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const { open, confirm } = useConfirm({
  title: "Are You Sure You Want To Delete The Conversation?!!",
  description: "Warning the is action is premenant!!",
});
const handleDelete = async () => {
  await open();
  if (confirm.value) {
    pr("the user pressed yes");
  } else {
    pr("the user pressed no");
  }
};
</script>

<template>
  <UDrawer direction="right" v-model:open="isOpen">
    <!-- Trigger Button -->
    <div
      class="rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <Ellipsis />
    </div>

    <template #content>
      <div
        class="mt-5 flex h-full min-w-[20rem] flex-col rounded-lg bg-white shadow-lg dark:bg-gray-800"
      >
        <!-- Header with Close Button -->
        <div
          class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700"
        >
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
            Conversation Details
          </h3>
          <button
            @click="isOpen = false"
            class="rounded-full p-2 transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X />
          </button>
        </div>

        <!-- Content Body -->
        <div class="flex-1 overflow-y-auto p-6">
          <!-- Avatar & Basic Info -->
          <div class="flex flex-col items-center text-center">
            <div
              class="mb-4 transform transition-transform duration-300 hover:scale-105"
            >
              <Avatar :user="otherUsers[0]" class="h-24 w-24" />
            </div>
            <h2 class="mb-1 text-xl font-bold text-gray-800 dark:text-white">
              {{ title }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ statusText }}
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="my-8 flex justify-center">
            <div
              class="group flex cursor-pointer flex-col items-center gap-3 rounded-xl p-4 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 transition-colors duration-300 group-hover:bg-red-200 dark:bg-red-900/30 dark:group-hover:bg-red-800/40"
                @click="handleDelete"
              >
                <Icon
                  name="ion:trash"
                  size="24"
                  class="text-red-600 dark:text-red-400"
                />
              </div>
              <div
                class="text-sm font-medium text-red-600 transition-colors duration-300 group-hover:text-red-700 dark:text-red-400 dark:group-hover:text-red-300"
              >
                Delete Conversation
              </div>
            </div>
          </div>

          <!-- Details Section -->
          <div class="w-full pt-4">
            <dl class="space-y-6 px-2 sm:px-4">
              <!-- Group Members -->
              <div
                v-if="conversation.isGroup"
                class="rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:shadow-md dark:bg-gray-700/50"
              >
                <dt
                  class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Group Members
                </dt>
                <dd
                  class="mt-1 flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span
                    v-for="user in conversation.users"
                    :key="user.id"
                    class="rounded-full bg-white px-2 py-1 text-gray-800 shadow-sm dark:bg-gray-800 dark:text-gray-200"
                  >
                    {{ user.name }}
                  </span>
                </dd>
              </div>

              <!-- User Info -->
              <div v-else class="space-y-6">
                <div
                  class="rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:shadow-md dark:bg-gray-700/50"
                >
                  <dt
                    class="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </dt>
                  <dd
                    class="mt-1 text-base font-medium text-gray-800 capitalize dark:text-gray-200"
                  >
                    {{ otherUsers[0].name }}
                  </dd>
                </div>

                <USeparator class="my-4 bg-gray-200 dark:bg-gray-700" />

                <div
                  class="rounded-xl bg-gray-50 p-4 transition-all duration-300 hover:shadow-md dark:bg-gray-700/50"
                >
                  <dt
                    class="mb-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Joined
                  </dt>
                  <dd class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    <time :dateTime="otherUsers[0].createdAt">
                      {{ formatDate(otherUsers[0].createdAt.toString()) }}
                    </time>
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
