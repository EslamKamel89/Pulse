<script setup lang="ts">
const { clear } = useUserSession();
const handleLogout = async () => {
  await clear();
  navigateTo("/");
};
</script>
<template>
  <div class="flex h-screen w-screen flex-col">
    <div class="flex h-screen w-screen flex-1 flex-row overflow-hidden">
      <LayoutActionsNavigation />
      <LayoutUsersNavigation class="" />
      <LayoutConversationsNavigation />
      <div class="flex w-full flex-1 justify-start">
        <slot />
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
