<script setup lang="ts"></script>
<template>
  <div class="flex h-screen w-screen flex-col">
    <div class="flex h-screen w-screen flex-1 flex-row overflow-hidden">
      <LayoutActionsNavigation />
      <LayoutUsersNavigation class="" />
      <LayoutConversationsNavigation />
      <div class="flex w-full flex-1 justify-start">
        <div
          class="w-full bg-gray-100 px-4 py-10 sm:px-6 lg:px-8 lg:py-6 dark:bg-gray-900"
        >
          <slot />
        </div>
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
