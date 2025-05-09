<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { UseFetchKey } from "~/types";
import type { Conversation, User } from "~/types/db";

const open = ref(false);
const { setLoading, setAppError, showToast } = useStore();

const props = defineProps<{
  users: User[];
}>();

const options = computed(() =>
  props.users.map((user) => ({
    value: user.id,
    label: user.name,
  })),
);

const state = reactive<Partial<GroupChatModelSchemaType>>({
  name: undefined,
  selectedUsers: undefined,
});

async function onSubmit(event: FormSubmitEvent<GroupChatModelSchemaType>) {
  setLoading(true);
  try {
    const conversation = await $fetch<Conversation>("/api/conversations", {
      method: "POST",
      body: {
        isGroup: true,
        members: event.data.selectedUsers,
        name: event.data.name,
      },
    });
    if (conversation) {
      refreshNuxtData("conversations" as UseFetchKey);
      showToast({
        message: "New Group Chat Created",
        type: "success",
      });
      open.value = false;
    } else {
      setAppError({
        message: "Unknown error occured",
        statusMessage: "Unknown error occured",
      });
    }
  } catch (error) {
    setAppError(handleApiError(error));
  } finally {
    setAppError(null);
    setLoading(false);
  }
}
const closeModal = () => {
  open.value = false;
};
</script>
<template>
  <UModal
    v-model:open="open"
    title="Create Group"
    description="Bring your people together! Create a group to share messages, plan events, or collaborate—all in one space. Name your group, add members, and customize settings to fit your vibe. Perfect for friends, teams, or communities!"
    :close="{
      color: 'primary',
      variant: 'outline',
      class: 'rounded-full',
    }"
    close-icon="i-lucide-x"
  >
    <slot />

    <template #body>
      <div>
        <UForm
          :schema="groupChatModelSchema"
          :state="state"
          class="w-full space-y-4"
          @submit.prevent="onSubmit"
        >
          <div class="flex w-full flex-col md:flex-row md:space-x-5">
            <UFormField label="Group Name" name="name" class="w-full">
              <UInput v-model="state.name" class="w-full" />
            </UFormField>

            <UFormField
              label="Select Users"
              name="selectedUsers"
              class="w-full"
            >
              <USelect
                v-model="state.selectedUsers"
                :items="options"
                class="w-full"
                multiple
              />
            </UFormField>
          </div>

          <div class="flex space-x-2">
            <UButton @click="closeModal" color="error" type="button"
              >Cancel</UButton
            >
            <UButton color="primary" type="submit">Save</UButton>
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
