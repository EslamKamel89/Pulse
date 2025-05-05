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
      <LayoutUsersNavigation />
      <div class="flex-1">
        <slot />
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
