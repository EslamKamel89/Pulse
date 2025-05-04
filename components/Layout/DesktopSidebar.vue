<script setup lang="ts">
import type { NavRoute } from "~/types";

const { routes } = useRoutes();
const handleClick = (route: NavRoute) => {
  pr("hello world");
  if (route.onClick) {
    route.onClick();
  } else {
    navigateTo(route.href);
  }
};
</script>
<template>
  <div class="flex h-full flex-col">
    <div
      class="hidden flex-1 justify-between lg:flex lg:w-20 lg:flex-col lg:overflow-y-auto lg:border-r-[1px] lg:bg-white lg:pb-4 xl:px-6 dark:border-gray-700 dark:bg-gray-900"
    >
      <nav class="mt-4 flex flex-col justify-between">
        <ul class="flex flex-col items-center space-y-1">
          <UTooltip
            v-for="route in routes"
            :key="route.label"
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 8,
            }"
            :text="route.label"
          >
            <div
              class="group hover:text-primary dark:hover:text-primary flex gap-x-3 rounded-full p-3 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              :class="{
                'text-primary bg-gray-100 dark:bg-gray-700 dark:text-white':
                  route.active,
              }"
              @click="handleClick(route)"
            >
              <Icon :name="route.icon" class="h-5 w-5 shrink-0"></Icon>
              <span class="sr-only">{{ route.label }}</span>
            </div>
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
