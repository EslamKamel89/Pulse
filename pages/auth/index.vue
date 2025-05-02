<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import type { LoginSchemaType, RegisterSchemaType } from "~/utils/validation";

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

const register = reactive<RegisterSchemaType>({
  name: "",
  email: "",
  password: "",
  confirm: "",
});
const login = reactive<LoginSchemaType>({
  email: "",
  password: "",
});
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
      <p class="text-muted mb-4">
        {{ (item as TabsItem).description }}
      </p>

      <UForm
        :state="login"
        :schema="loginSchema"
        class="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
      >
        <UFormField label="Email" name="email">
          <UInput v-model="register.email" class="w-full" type="email" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput v-model="register.password" type="password" class="w-full" />
        </UFormField>

        <UButton
          label="Sign In"
          type="submit"
          variant="soft"
          class="flex justify-center text-center md:col-span-2"
        />
      </UForm>
      <AuthSocial buttonLabel="Sign in with Github" />
    </template>

    <template #register="{ item }">
      <p class="text-muted mb-4">
        {{ (item as TabsItem).description }}
      </p>

      <UForm
        :state="register"
        :schema="registerSchema"
        class="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
      >
        <UFormField label="Name" name="name">
          <UInput v-model="register.name" class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email">
          <UInput v-model="register.email" class="w-full" type="email" />
        </UFormField>
        <UFormField label="Password" name="password">
          <UInput v-model="register.password" type="password" class="w-full" />
        </UFormField>
        <UFormField label="Confirm Password" name="confirm">
          <UInput v-model="register.confirm" type="password" class="w-full" />
        </UFormField>

        <UButton
          label="Create Account"
          type="submit"
          variant="soft"
          class="flex justify-center text-center md:col-span-2"
        />
      </UForm>
      <AuthSocial buttonLabel="Register with Github" />
    </template>
  </UTabs>
</template>

<style>
button {
  cursor: pointer;
}
</style>
