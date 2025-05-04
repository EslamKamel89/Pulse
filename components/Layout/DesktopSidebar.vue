<template>
  <div>
    <div
      class="hidden justify-between lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6 dark:border-gray-700 dark:bg-gray-900"
    >
      <nav class="mt-4 flex flex-col justify-between">
        <ul class="flex flex-col items-center space-y-1">
          <!--
                  <UTooltip v-for="item in routes" :key="item.label" :text="item.label"
                  :popper="{ placement: 'right' }">
                  <li @click="handleClick(item)">
                    <div class="group flex gap-x-3 rounded-full p-3 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary dark:text-white dark:hover:bg-gray-700 dark:hover:text-primary"
                    :class="{ 'bg-gray-100 text-primary dark:bg-gray-700 dark:text-white': item.active }">
                    <Icon :name="item.icon" class="h-5 w-5 shrink-0"></Icon>
                    <span class="sr-only">{{ item.label }}</span>
                  </div>
                </li>
              </UTooltip>
            -->
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

<script setup lang="ts"></script>

<style scoped></style>
