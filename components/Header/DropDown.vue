<template>
  <div
    v-if="isDropdownOpen"
    class="min-w-[272px] w-full rounded-2xl bg-white shadow-200 px-[30px] py-6 text-sm flex flex-col gap-3 absolute right-0 top-full mt-3 z-50">
    <NuxtLink
      v-if="session"
      v-for="item in sessionLinks"
      :key="item.to"
      @click="closeDropdown"
      :to="item.to"
      activeClass="font-semibold"
      class="flex items-center gap-3 hover:font-semibold">
      {{ item.label }}
    </NuxtLink>
    <NuxtLink
      v-if="!session"
      @click="closeDropdown"
      to="/login"
      activeClass="font-semibold"
      class="flex items-center gap-3 hover:font-semibold">
      Login
    </NuxtLink>
    <NuxtLink
      v-if="!session"
      @click="closeDropdown"
      to="/sign-up"
      activeClass="font-semibold"
      class="flex items-center gap-3 hover:font-semibold">
      Sign Up
    </NuxtLink>
    <hr />
    <NuxtLink
      v-if="!session"
      @click="closeDropdown"
      to="/about"
      activeClass="font-semibold"
      class="flex items-center gap-3 hover:font-semibold">
      About
    </NuxtLink>
    <NuxtLink
      v-if="!session"
      @click="closeDropdown"
      to="/how-it-Works"
      activeClass="font-semibold"
      class="flex items-center gap-3 hover:font-semibold">
      How it Works
    </NuxtLink>
    <NuxtLink
      @click="closeDropdown"
      to="/post"
      activeClass="font-semibold"
      class="flex items-center gap-3 hover:font-semibold">
      Posts
    </NuxtLink>
    <template v-if="session">
      <NuxtLink
        @click="signOut"
        class="flex items-center gap-3 hover:font-semibold cursor-pointer">
        Log Out
      </NuxtLink>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  isDropdownOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["closeDropdown"]);

function closeDropdown() {
  emit("closeDropdown");
}

const session = useSupabaseSession();
const client = useSupabaseClient();
const signOut = async () => {
  closeDropdown();
  const { error } = await client.auth.signOut();
  if (error) {
    console.error(error.message);
  } else {
    navigateTo("/login");
    session.value.refresh_token;
  }
};

const sessionLinks = [
  { label: "Wishlists", to: "/Whitelist" },
  { label: "Dashboard", to: "/admin" },
];
</script>
