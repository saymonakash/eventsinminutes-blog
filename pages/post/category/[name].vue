<template>
  <div class="main-container">
    <div class="xl:h-[96px] h-10 md:h-16 w-full" />
    <div>
      <h1 class="text-4xl md:text-5xl font-semibold pb-4 capitalize">
        {{ currectCategoryName.replace(/-/g, ' ') }}
      </h1>
      <p class="text-sm md:text-base text-grey">
        A collection of {{ filterdCategoryPosts.length }} posts
      </p>
    </div>
    <div class="h-16 w-full" />
    <SectionArticles :posts="filterdCategoryPosts" />
    <div class="h-[84px] w-full" />
  </div>
</template>

<script setup lang="ts">
import SectionArticles from '~/components/PostPage/SectionArticles.vue'
import type { Post } from '~/types/types'
const supabase = useSupabaseClient()
const currectCategoryName = String(useRoute().params.name)
const posts = ref<Post[]>([])

const filterdCategoryPosts = computed(() => {
  return posts.value.filter(
    (post) =>
      post.category.toLocaleLowerCase().replace(/\s/g, '-') ===
      currectCategoryName,
  )
})

onMounted(async () => {
  const { data, error } = await supabase.from('posts').select('*')
  if (error) console.error('Error fetching posts:', error)
  else posts.value = data as Post[]
})
</script>
