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
  <div>
    <LayoutMobileUserList :users="users ?? []" :pending="status == 'pending'" />
    <LayoutDesktopUserList
      :users="users ?? []"
      :pending="status == 'pending'"
    />
  </div>
</template>
