<script setup lang="ts">
import type { UseFetchKey } from "~/types";
import type { User } from "~/types/db";

const {
  data: users,
  status,
  execute,
} = await useFetch<User[]>("/api/users", {
  lazy: true,
  immediate: false,
  server: false,
  key: "users" as UseFetchKey,
});
onMounted(() => {
  execute();
});
</script>
<template>
  <div
    class="b flex min-h-full w-min flex-col self-stretch bg-gray-100 dark:bg-gray-900"
  >
    <UDrawer direction="left">
      <div class="block w-fit lg:hidden">
        <UButton
          color="neutral"
          variant="subtle"
          trailing-icon="i-lucide-align-left"
          class="m-2"
        />
      </div>

      <template #content>
        <LayoutUsersList
          :users="users ?? []"
          :pending="status == 'pending'"
          :is-desktop="false"
        />
      </template>
    </UDrawer>
    <LayoutUsersList
      :users="users ?? []"
      :pending="status == 'pending'"
      :is-desktop="true"
    />
  </div>
</template>
