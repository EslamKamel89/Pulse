<script setup lang="ts">
const { clear } = useUserSession();
const handleLogout = async () => {
  await clear();
  navigateTo("/");
};
</script>
<template>
  <div class="flex !min-h-screen flex-col">
    <div class="flex h-full flex-1 flex-row">
      <LayoutNavigation />
      <LayoutUsersNavigation />
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>
