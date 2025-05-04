<script setup lang="ts"></script>
<template>
  <div class="hidden lg:block">
    <footer
      class="w-full border-t border-gray-200 bg-white p-4 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:border-gray-600 dark:bg-gray-800"
    >
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© {{ new Date().getFullYear() }}
        <NuxtLink to="/" class="hover:underline">Pulse™</NuxtLink>. All Rights
        Reserved.
      </span>
      <ul
        class="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400"
      >
        <li>
          <a href="#" class="me-4 hover:underline md:me-6">About</a>
        </li>
        <li>
          <a href="#" class="me-4 hover:underline md:me-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="me-4 hover:underline md:me-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </footer>
  </div>
</template>
