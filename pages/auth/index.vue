<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
const items = [
  {
    label: "Sign In to Your Chat Hub",
    description:
      "Sign in to reconnect with friends, join conversations, and stay in the loop. Your chats are waiting!.",
    icon: "i-lucide-user",
    slot: "login",
  },
  {
    label: "Regsiter-Your Chat Awaits",
    description:
      "Sign up now to unlock seamless messaging, group chats, and more. No spam, just real talk.",
    icon: "i-lucide-message-circle-heart",
    slot: "register" as const,
  },
] satisfies TabsItem[];

definePageMeta({
  layout: "auth",
});
</script>

<template>
  <UTabs
    :items="items"
    variant="pill"
    class="h-full w-full gap-4 overflow-x-hidden !text-wrap"
    :ui="{ trigger: 'flex-1' }"
  >
    <template #login="{ item }">
      <AuthLogin :item="item as TabsItem" />
    </template>

    <template #register="{ item }">
      <AuthRegister :item="item as TabsItem" />
    </template>
  </UTabs>
</template>
