<script setup lang="ts"></script>
<template>
  <div>
    <div class="space-y-4">
      <div class="flex items-center gap-4" v-for="i in 5" :key="i">
        <USkeleton class="h-8 w-8 rounded-full" />

        <div class="grid gap-2">
          <USkeleton class="h-4 w-[150px]" />
          <USkeleton class="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  </div>
</template>
