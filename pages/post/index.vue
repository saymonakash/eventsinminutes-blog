<template>
  <div class="main-container">
    <!-- Spacer for top margin -->
    <div class="xl:h-24 h-10 md:h-16 w-full" />

    <!-- Header component -->
    <PostsHeader />

    <!-- Spacer between header and featured card -->
    <div class="xl:h-[84px] h-10 md:h-16 w-full" />

    <!-- Featured post card -->
    <FeaturedCard v-if="posts.length" :post="posts[0]" />

    <!-- Spacer between featured card and articles section -->
    <div class="h-[84px] w-full" />
    <hr />
    <div class="h-[84px] w-full" />

    <!-- Articles section -->
    <SectionArticles :posts="posts.slice(1)" />

    <!-- Spacer for bottom margin -->
    <div class="h-[84px] w-full" />
  </div>
</template>

<script setup lang="ts">
import FeaturedCard from '~/components/PostPage/FeaturedCard.vue'
import PostsHeader from '~/components/PostPage/PostsHeader.vue'
import SectionArticles from '~/components/PostPage/SectionArticles.vue'
import type { Post } from '~/types/types'

// Reactive variable to store posts
const posts = ref<Post[]>([])

// Initialize Supabase client
const supabase = useSupabaseClient()

// Fetch posts from the database on component mount
onMounted(async () => {
  try {
    const { data, error } = await supabase.from('posts').select('*')
    if (error) throw error
    posts.value = data as Post[]
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
})
</script>
