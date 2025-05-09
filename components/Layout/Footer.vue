<template>
  <div class="hidden lg:block">
    <footer
      class="relative w-full border-t border-gray-200 bg-gradient-to-r from-white to-gray-50 p-4 shadow-sm md:flex md:items-center md:justify-between md:p-6 dark:border-gray-700/50 dark:from-gray-800 dark:to-gray-900"
    >
      <!-- Background decoration -->
      <div
        class="bg-grid-pattern absolute inset-0 z-0 opacity-5 dark:opacity-10"
      ></div>

      <!-- Footer Content -->
      <div class="relative z-10">
        <span class="text-sm text-gray-600 sm:text-center dark:text-gray-400">
          © {{ new Date().getFullYear() }}
          <NuxtLink
            to="/"
            class="font-semibold text-blue-600 transition-colors duration-300 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
          >
            Pulse™ </NuxtLink
          >. All Rights Reserved.
        </span>
      </div>

      <!-- Navigation Links -->
      <ul
        class="relative z-10 mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-gray-600 sm:mt-0 dark:text-gray-400"
      >
        <li class="group">
          <a
            href="#"
            class="flex items-center gap-1 transition-all duration-300 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
          >
            About
            <span
              class="block h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </li>

        <li class="group">
          <a
            href="#"
            class="flex items-center gap-1 transition-all duration-300 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
          >
            Licensing
            <span
              class="block h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </li>
        <li class="group">
          <a
            href="#"
            class="flex items-center gap-1 transition-all duration-300 hover:text-blue-600 hover:underline dark:hover:text-blue-400"
          >
            Contact
            <span
              class="block h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"
            ></span>
          </a>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.bg-grid-pattern {
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239CA3AF' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='20' /%3E%3C/g%3E%3C/svg%3E");
}
</style>
