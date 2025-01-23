<template>
  <div
    v-if="isDropdownOpen"
    class="min-w-[272px] w-full rounded-2xl bg-white shadow-200 px-[30px] py-6 text-sm flex flex-col gap-3 absolute right-0 top-full mt-3 z-50"
  >
  <template  v-for="(item,i) in linkItems"
  :key="item.to">
  <NuxtLink
    @click="closeDropdown"
    :to="item.to"
    activeClass="font-semibold"
    class="flex items-center gap-3 hover:font-semibold"
  >
    {{ item.label }}
  </NuxtLink>
  <hr v-if="!user && i === 1 ||user && i === linkItems.length - 1" />
  </template >
    <NuxtLink
    v-if="user"
    @click="signOut"
    class="flex items-center gap-3 hover:font-semibold cursor-pointer"
  >
    Log Out
  </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isDropdownOpen: {
    type: Boolean,
    required: true,
  },
})

// Emit event
const emit = defineEmits(['closeDropdown'])

// Function to close the dropdown
function closeDropdown() {
  emit('closeDropdown')
}

// Supabase user and client instances
const user = useSupabaseUser()
const client = useSupabaseClient()

// Function to sign out the user
const signOut = async () => {
  closeDropdown()
  const { error } = await client.auth.signOut()
  if (error) {
    console.error(error.message)
  } else {
    navigateTo('/login')
  }
}

// Links for logged-in users
const logInLinks = [
  { label: 'Wishlists', to: '/Whitelist' },
  { label: 'Dashboard', to: '/admin' },
  { label: 'Post', to: '/post' },
]

// Links for logged-out users
const logOutLinks = [
  { label: 'Login', to: '/Login' },
  { label: 'Sign Up', to: '#' },
  { label: 'About', to: '#' },
  { label: 'How it Works', to: '#' },
  { label: 'Post', to: '/post' },
]

// Reactive link items based on user state
const linkItems = ref(user.value ? logInLinks : logOutLinks)

// Watch for changes in user state to update link items
watch(user, () => {
  linkItems.value = user.value ? logInLinks : logOutLinks
})

// Function to determine if a separator should be shown
function shouldShowSeparator(index) {
  // Show separator after 'Login' for logged-out users or at the end for logged-in users
  return (!user.value && index === 1) || (user.value && index === linkItems.value.length - 1)
}
</script>
