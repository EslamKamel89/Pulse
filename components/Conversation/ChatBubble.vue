<script setup lang="ts">
import type { Message } from "~/types/db";

const props = defineProps<{
  message: Message;
}>();
const user = useUserSession().user;
const isCurrentUser = computed(
  () => user.value?.id == props.message.sender?.id,
);
</script>
<template>
  <div
    class="flex w-full"
    :class="{ 'justify-end': isCurrentUser, 'justify-start': !isCurrentUser }"
  >
    <div
      class="flex items-start gap-2.5"
      :class="{ 'flex-row-reverse': isCurrentUser, 'flex-row': !isCurrentUser }"
    >
      <SharedAvatar v-if="message.sender" :user="message.sender" />
      <div
        class="flex w-full max-w-[320px] flex-col border-gray-200 bg-gray-100 p-4 leading-1.5 dark:bg-gray-700"
        :class="{
          'rounded-s-xl rounded-es-xl': isCurrentUser,
          'rounded-e-xl rounded-se-xl': !isCurrentUser,
        }"
      >
        <div>
          <img
            v-if="message.image"
            :src="`${message.image}`"
            alt="not found"
            class="h-32 rounded-lg"
          />
        </div>
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
          <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
            message.sender?.name
          }}</span>
          <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
            {{ useDateFormat(message.createdAt, "hh:mm A") }}</span
          >
        </div>
        <p class="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
          {{ message.body }}
        </p>
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
          >Delivered</span
        >
      </div>
    </div>
  </div>
</template>
