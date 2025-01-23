<template>
  <div class="main-container">
    <div class="xl:h-[96px] h-10 md:h-16 w-full" />
    <PostsHeader />
    <div class="xl:h-[84px] h-10 md:h-16 w-full" />
    <FeaturedCard
      v-for="(post, i) in posts.splice(0, 1)"
      :key="i"
      :post="post"
    />
    <div class="h-[84px] w-full" />
    <hr />
    <div class="h-[84px] w-full" />
    <SectionArticles :posts="posts" />
    <div class="h-[84px] w-full" />
  </div>
</template>

<script setup lang="ts">
import FeaturedCard from '~/components/PostPage/FeaturedCard.vue'
import PostsHeader from '~/components/PostPage/PostsHeader.vue'
import SectionArticles from '~/components/PostPage/SectionArticles.vue'
import type { Post } from '~/types/types'
const posts = ref<Post[]>([])

const supabase = useSupabaseClient()

onMounted(async () => {
  const { data, error } = await supabase.from('posts').select('*')
  if (error) console.error('Error fetching posts:', error)
  else posts.value = data as Post[]
})
</script>
