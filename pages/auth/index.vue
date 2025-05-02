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
    label: "Get Started – Your Chat Awaits",
    description:
      "Sign up now to unlock seamless messaging, group chats, and more. No spam, just real talk.",
    icon: "i-lucide-message-circle-heart",
    slot: "register" as const,
  },
] satisfies TabsItem[];

const state = reactive({
  name: "Benjamin Canac",
  username: "benjamincanac",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});
</script>

<template>
  <UTabs
    :items="items"
    variant="pill"
    class="w-full gap-4"
    :ui="{ trigger: 'flex-1' }"
  >
    <template #login="{ item }">
      <p class="text-muted mb-4">
        {{ (item as TabsItem).description }}
      </p>

      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Username" name="username">
          <UInput v-model="state.username" class="w-full" />
        </UFormField>

        <UButton
          label="Save changes"
          type="submit"
          variant="soft"
          class="self-end"
        />
      </UForm>
    </template>

    <template #register="{ item }">
      <p class="text-muted mb-4">
        {{ (item as TabsItem).description }}
      </p>

      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Current Password" name="current" required>
          <UInput
            v-model="state.currentPassword"
            type="password"
            required
            class="w-full"
          />
        </UFormField>
        <UFormField label="New Password" name="new" required>
          <UInput
            v-model="state.newPassword"
            type="password"
            required
            class="w-full"
          />
        </UFormField>
        <UFormField label="Confirm Password" name="confirm" required>
          <UInput
            v-model="state.confirmPassword"
            type="password"
            required
            class="w-full"
          />
        </UFormField>

        <UButton
          label="Change password"
          type="submit"
          variant="soft"
          class="self-end"
        />
      </UForm>
    </template>
  </UTabs>
</template>
