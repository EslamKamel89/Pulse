<script setup lang="ts">
import type { NavRoute } from "~/types";
import type { User } from "~/types/db";

const { routes } = useRoutes();
const handleClick = (route: NavRoute) => {
  if (route.onClick) {
    route.onClick();
  } else {
    navigateTo(route.href);
  }
};
const session = useUserSession();
</script>
<template>
  <div
    class="fixed bottom-0 z-40 flex h-16 w-full items-center justify-center border-t-[1px] bg-white px-4 lg:hidden dark:border-gray-700 dark:bg-gray-900"
  >
    <UTooltip
      v-for="item in routes"
      :key="item.label"
      :text="item.label"
      :popper="{ placement: 'top' }"
      class="flex flex-1 items-center"
    >
      <div @click="handleClick(item)">
        <div
          class="group hover:text-primary dark:hover:text-primary flex gap-x-3 rounded-full p-3 text-sm leading-6 font-semibold text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          :class="{
            'text-primary bg-gray-100 dark:bg-gray-700 dark:text-white':
              item.active,
          }"
        >
          <Icon :name="item.icon" class="h-5 w-5 shrink-0"></Icon>
          <!-- <span class="sr-only">{{ item.label }}</span> -->
        </div>
      </div>
    </UTooltip>
    <SharedAvatar
      v-if="session.user.value"
      :user="session.user.value as User"
    ></SharedAvatar>
  </div>
</template>
