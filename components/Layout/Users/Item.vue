<script setup lang="ts">
import type { User } from "~/types/db";

const props = defineProps<{ user: User }>();
const handleClick = () => {
  pr(props.user, "user");
};
</script>
<template>
  <div class="flex space-x-2" @click="handleClick">
    <div
      class="flex h-8 w-8 items-center justify-center rounded-full shadow-md"
    >
      <SharedAvatar :user="user" />
    </div>

    <div class="grid gap-1">
      <div class="h-4 w-[150px] overflow-clip text-xs">
        {{ user.email }}
      </div>
      <div class="h-4 w-[100px] overflow-clip text-xs font-semibold">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>
