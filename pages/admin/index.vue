<script setup lang="ts">
import CreatePost from '~/pages/admin/CreatePost.vue'

definePageMeta({
  middleware: function (to, from) {
    const user = useSupabaseUser()

    if (!user.value) {
      return navigateTo('/login')
    }
  },
})
</script>

<template>
  <CreatePost />
</template>
