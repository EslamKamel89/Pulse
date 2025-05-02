<script setup lang="ts"></script>
<template>
  <div class="flex !min-h-screen flex-col">
    <div>
      <SharedThemeSelector />
    </div>
    <div class="mt-8 h-full flex-1">
      <div
        class="m-4 mx-auto max-w-3xl rounded-lg border border-gray-200 p-4 shadow-sm dark:border-gray-700"
      >
        <slot />
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
