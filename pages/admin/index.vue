<script setup lang="ts">
import CreatePost from '~/pages/admin/CreatePost.vue'

// Define page metadata with middleware for authentication
definePageMeta({
  middleware: (to, from) => {
    const user = useSupabaseUser()

    // If the user is not logged in, redirect to the login page
    if (!user.value) {
      return navigateTo('/login')
    }
  },
})
</script>

<template>
  <!-- Render the CreatePost component -->
  <CreatePost />
</template>
