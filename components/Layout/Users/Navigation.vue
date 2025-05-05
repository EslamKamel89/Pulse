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
  <div class="flex min-h-full flex-1 flex-col self-stretch">
    <UDrawer direction="left">
      <div class="block lg:hidden">
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
