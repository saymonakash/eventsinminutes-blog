<template>
  <footer class="bg-dark-grey bg-opacity-10 pt-12 pb-9">
    <div class="main-container">
      <div class="flex md:justify-between flex-col md:flex-row gap-9">
        <div class="flex flex-col md:gap-6 gap-9">
          <Logo />
          <nav class="flex items-center flex-wrap md:gap-6 gap-4 text-sm">
            <NuxtLink
              :to="item.link"
              v-for="(item, i) in linkItems.slice(0, 5)"
              :key="i">
              {{ item.title }}
            </NuxtLink>
          </nav>
        </div>
        <div class="space-y-2 text-sm">
          <p class="font-semibold">Contacts</p>
          <NuxtLink
            to="mailto:contact@eventsinminutes.com"
            class="flex items-center gap-2">
            <NuxtImg class="size-5" src="icons/icon-mail.svg" />
            <span>contact@eventsinminutes.com</span> </NuxtLink
          ><NuxtLink
            to="mailto:contact@eventsinminutes.com"
            class="flex items-center gap-2">
            <NuxtImg class="size-5" src="icons/icon-call.svg" />
            <span>+1 (628) 587-3235</span>
          </NuxtLink>
        </div>
      </div>
      <div
        class="flex md:justify-between flex-col md:flex-row gap-2 md:pt-6 pt-4 mt-8 border-t border-dark-grey/10">
        <div class="flex items-center gap-4 text-dark text-xs">
          <template v-for="(item, i) in linkItems.slice(-2)" :key="i">
            <NuxtLink :to="item.link">
              {{ item.title }}
            </NuxtLink>
            <span v-if="i < linkItems.slice(-2).length - 1"
              ><svg
                width="4"
                height="5"
                viewBox="0 0 4 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect y="0.502441" width="4" height="4" rx="2" fill="#6A6A6A" />
              </svg>
            </span>
          </template>
        </div>
        <p class="text-xs text-dark/70">
          2024 - © All rights Reserved - Events In Minutes
        </p>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import Logo from "~/components/Logo.vue";
const linkItems = [
  {
    title: "About Us",
    link: "#",
  },
  {
    title: "Corporate Events",
    link: "#",
  },
  {
    title: "Personal Events",
    link: "#",
  },
  {
    title: "List Your Service",
    link: "#",
  },
  {
    title: "How it Works",
    link: "#",
  },
  {
    title: "Privacy Policy",
    link: "#",
  },
  {
    title: "Terms & Conditions",
    link: "#",
  },
];
</script>
