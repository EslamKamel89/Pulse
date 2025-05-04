<script setup lang="ts">
//?c this  page will be for guest users only
definePageMeta({
  layout: "guest",
});
const { user } = useUserSession();
watch(
  user,
  (newUser) => {
    if (newUser) {
      navigateTo("/user");
    }
  },
  { immediate: true },
);
</script>
<template>
  <div class="block text-xl text-red-500">home page</div>
  <Icon name="uil:star" style="color: black" />
</template>
