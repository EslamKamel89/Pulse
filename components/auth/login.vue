<script setup lang="ts">
import type { FormSubmitEvent, TabsItem } from "@nuxt/ui";

defineProps<{ item: TabsItem }>();
const login = reactive<LoginSchemaType>({
  email: "",
  password: "",
});
const { fetch: refreshSession, clear } = useUserSession();
const store = useStore();
const { isLoading } = toRefs(store.state.value);
const onSubmit = async (event: FormSubmitEvent<LoginSchemaType>) => {
  try {
    await clear();
    store.setLoading(true);
    const user = await $fetch("api/auth/login", {
      method: "POST",
      body: event.data,
    });
    if (user) {
      pr(user, "User signedIn successfully");
      await refreshSession();
      store.showToast({
        message: "Login",
        description: "Login successfully",
        type: "success",
      });
      await navigateTo("/user");
    } else {
      pr(user, "User signedIn failed");
      store.setAppError({
        message: "Login ",
        statusMessage: "Login failed",
      });
    }
  } catch (error) {
    pr(error, "Error - User signedIn failed");
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
      {{ item.description }}
    </p>

    <UForm
      :state="login"
      @submit.prevent="onSubmit"
      :schema="loginSchema"
      class="flex flex-col space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0"
    >
      <UFormField label="Email" name="email">
        <UInput v-model="login.email" class="w-full" type="email" />
      </UFormField>
      <UFormField label="Password" name="password">
        <UInput v-model="login.password" type="password" class="w-full" />
      </UFormField>

      <UButton
        label="Sign In"
        type="submit"
        variant="soft"
        :disabled="isLoading"
        class="flex justify-center text-center md:col-span-2"
      />
    </UForm>
    <AuthSocial buttonLabel="Sign in with Github" />
  </div>
</template>
