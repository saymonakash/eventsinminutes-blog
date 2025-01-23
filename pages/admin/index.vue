<script setup lang="ts">
import CreatePost from "~/pages/admin/CreatePost.vue";

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <CreatePost />
</template>
