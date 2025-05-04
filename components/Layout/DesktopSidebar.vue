<script setup lang="ts"></script>
<template>
  <div>
    <div
      class="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6 dark:border-gray-700 dark:bg-gray-900"
    >
      <nav class="mt-4 flex flex-col justify-between">
        <ul class="flex flex-col items-center space-y-1">
          <UTooltip
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 8,
            }"
            text="Open on GitHub"
          >
            <UButton label="Open" color="neutral" variant="subtle" />
          </UTooltip>
        </ul>
      </nav>
      <!-- 
            
            <div class=" mt-4 flex space-y-2 justify-between items-center">
              <div @click="isOpen = true" class="cursor-pointer hover:opacity-75 transition">
                <Avatar :user="user"></Avatar>
              </div>
              
            </div>
          -->
    </div>
  </div>
  <!--
  <SettingsModal :is-open="isOpen" @close-modal="isOpen = false"></SettingsModal>
--></template>
