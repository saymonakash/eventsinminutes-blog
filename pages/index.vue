<template>
  <div
    class="flex flex-col items-center justify-center h-screen fixed inset-0 bg-white z-20"
  >
    <h1 claass="text-2xl md:text-4xl">Welcome to EventsInMinutes Blog</h1>
    <div class="md:text-7xl text-5xl">Redirecting to Post Page...</div>
  </div>
</template>

<script setup>
const router = useRouter()

onMounted(() => {
  router.push('/post')
})
</script>
