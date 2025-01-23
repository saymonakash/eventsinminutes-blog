<template>
  <header class="py-4 sticky inset-x-0 top-0 bg-white z-50 shadow-200">
    <div class="main-container flex items-center justify-between">
      <div class="flex items-center gap-6">
        <Logo />
        <NuxtLink
          to="tel:+1 (628) 587-3235"
          class="md:flex hidden items-center gap-3 text-sm"
        >
          <NuxtImg src="images/icons/icon-call.svg" class="size-5" />
          <span>+1 (628) 587-3235</span>
        </NuxtLink>
      </div>
      <nav class="flex items-center gap-6">
        <NuxtLink to="#" class="text-sm font-semibold hidden md:block"
          >Top Vendors, Apply Now!</NuxtLink
        >
        <div class="relative">
          <div
            @click="toggleDropdown"
            class="flex items-center gap-3 py-2 px-4 rounded-full text-dark cursor-pointer bg-primary/5"
          >
            <NuxtImg src="images/icons/icon-menu.svg" alt="icon-menu.svg" class="size-6" />
            <div class="size-8 rounded-full overflow-hidden">
              <NuxtImg
                :src="
                  user ? 'images/user.png' : 'images/icons/icon-user.svg'
                "
                alt="user.svg"
                class="size-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <Transition
            enter-from-class="opacity-0 transform scale-90"
            enter-active-class="transition ease-out duration-100"
            enter-to-class="opacity-100 transform scale-100"
            leave-from-class="opacity-100 transform scale-100"
            leave-active-class="transition ease-in duration-100"
            leave-to-class="opacity-0 transform scale-90"
          >
            <DropDown
              :isDropdownOpen="isDropdownOpen"
              @closeDropdown="isDropdownOpen = false"
            />
          </Transition>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
import DropDown from '~/components/Header/DropDown.vue'
import Logo from '~/components/Logo.vue'
const isDropdownOpen = ref(false)
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
const user = useSupabaseUser()
</script>
