<script setup lang="ts">
import type { FormSubmitEvent, TabsItem } from "@nuxt/ui";

const register = reactive<RegisterSchemaType>({
  name: "",
  email: "",
  password: "",
  confirm: "",
});
defineProps<{ item: TabsItem }>();
const { fetch: refreshSession, clear } = useUserSession();
const store = useStore();
const { isLoading } = toRefs(store.state.value);
const onSubmit = async (event: FormSubmitEvent<RegisterSchemaType>) => {
  try {
    await clear();
    store.setLoading(true);
    const user = await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        name: register.name,
        email: register.email,
        password: register.password,
        confirm: register.confirm,
      },
    });
    if (user) {
      pr(user, "User registered successfully");
      await refreshSession();
      store.showToast({
        message: "Login",
        description: "Login successfully",
        type: "success",
      });
      await navigateTo("/user");
    } else {
      pr(user, "User registeration failed");
      store.setAppError({
        message: "Register ",
        statusMessage: "Register failed",
      });
    }
  } catch (error) {
    pr(error, "Error - User registeration failed");
    store.setAppError(handleApiError(error));
  } finally {
    store.setLoading(false);
    store.setAppError(null);
  }
};
</script>
<template>
  <div>
    <p class="text-muted mb-4">
      {{ (item as TabsItem).description }}
    </p>

    <UForm
      @submit.prevent="onSubmit"
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
        :disabled="isLoading"
        class="flex justify-center text-center md:col-span-2"
      />
    </UForm>
    <AuthSocial buttonLabel="Register with Github" />
  </div>
</template>
