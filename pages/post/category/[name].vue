<template>
  <div class="main-container">
    <div class="xl:h-[96px] h-10 md:h-16 w-full" />
    <div>
      <h1 class="text-4xl md:text-5xl font-semibold pb-4 capitalize">
        {{ currentCategoryName.replace(/-/g, ' ') }}
      </h1>
      <p class="text-sm md:text-base text-grey">
        A collection of {{ filteredCategoryPosts.length }} posts
      </p>
    </div>
    <div class="h-16 w-full" />
    <SectionArticles :posts="filteredCategoryPosts" />
    <div class="h-[84px] w-full" />
  </div>
</template>

<script setup lang="ts">
import SectionArticles from '~/components/PostPage/SectionArticles.vue'
import type { Post } from '~/types/types'

// Initialize Supabase client
const supabase = useSupabaseClient()

// Get the current category name from the route parameters
const currentCategoryName = String(useRoute().params.name)

// Reactive variable to store posts
const posts = ref<Post[]>([])

// Computed property to filter posts by the current category
const filteredCategoryPosts = computed(() => {
  return posts.value.filter(post => 
    post.category.toLowerCase().replace(/\s/g, '-') === currentCategoryName
  )
})

// Fetch posts from Supabase on component mount
onMounted(async () => {
  const { data, error } = await supabase.from('posts').select('*')
  if (error) {
    console.error('Error fetching posts:', error)
  } else {
    posts.value = data as Post[]
  }
})
</script>
