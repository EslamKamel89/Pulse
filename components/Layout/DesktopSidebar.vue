<script setup lang="ts">
import type { NavRoute } from "~/types";

const { routes } = useRoutes();
const handleClick = (route: NavRoute) => {};
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
            <UIcon :name="route.icon" @click="handleClick(route)" />
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
