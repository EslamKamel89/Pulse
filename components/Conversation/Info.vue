<script setup lang="ts">
import { Ellipsis, X } from "lucide-vue-next";
import type { Conversation } from "~/types/db";

const props = defineProps<{
  conversation: Conversation;
}>();
const isOpen = ref(false);
</script>
<template>
  <UDrawer direction="right" v-model:open="isOpen">
    <Ellipsis />
    <template #content>
      <div class="mt-5 flex h-full min-w-sm flex-col">
        <div class="flex-1">
          <div class="w-full justify-start">
            <X @click="isOpen = false" />
          </div>
        </div>
      </div>
    </template>
  </UDrawer>
</template>
