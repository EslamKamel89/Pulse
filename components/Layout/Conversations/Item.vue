<script setup lang="ts">
import type { Conversation } from "~/types/db";

const props = defineProps<{
  conversation: Conversation;
  selected?: boolean;
}>();
const { setLoading, setAppError, showToast } = useStore();
const { user: existingUser } = await useUserSession();
const otherUser = computed(() => {
  return props.conversation.users?.find(
    (user) => user.id != existingUser.value?.id,
  );
});
const handleClick = async () => {
  //   try {
  //     setLoading(true);
  //     const conversation = await $fetch<Conversation>("/api/conversations", {
  //       method: "POST",
  //       body: { userId: props.user.id },
  //     });
  //     if (!conversation) {
  //       setAppError({
  //         message: "Unkwon error occured",
  //         statusMessage: "Unkwon error ouccured",
  //       });
  //     } else {
  //       pr(conversation, "conversation");
  //     }
  //   } catch (error) {
  //     setAppError(handleApiError(error));
  //   } finally {
  //     setLoading(false);
  //     setAppError(null);
  //   }
};
</script>
<template>
  <div class="flex space-x-2" @click="handleClick">
    <div
      class="flex h-8 w-8 items-center justify-center rounded-full shadow-md"
    >
      <SharedAvatar :user="otherUser ?? null" />
    </div>

    <div class="grid gap-1">
      <div class="h-4 w-[150px] overflow-clip text-xs">
        {{ otherUser?.email }}
      </div>
      <div class="h-4 w-[100px] overflow-clip text-xs font-semibold">
        {{ otherUser?.name }}
      </div>
    </div>
  </div>
</template>
