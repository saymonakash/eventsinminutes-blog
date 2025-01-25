<template>
  <div>
    <!-- Display title if provided -->
    <h3 v-if="title" class="text-2xl font-bold">Popular Articles</h3>
    <div v-if="title" class="h-8 md:h-10 xl:h-[50px]" />

    <!-- Display articles in a responsive grid -->
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 md:gap-y-12"
    >
      <SectionArticlesCard
        v-for="(post, i) in visiblePosts"
        :key="i"
        :post="post"
      />
    </div>

    <!-- Button to load more articles -->
    <button
      v-if="visiblePosts.length < props.posts.length"
      @click="loadMore"
      class="py-4 px-8 rounded-full text-sm font-medium text-black/70 border border-grey mt-10 md:mt-20"
    >
      View More
    </button>

    <!-- Button to load fewer articles -->
    <button
      v-if="visiblePosts.length > initialItemsToShow"
      @click="loadLess"
      class="py-4 px-8 rounded-full text-sm font-medium text-black/70 border border-grey mt-16"
    >
      View Less
    </button>
  </div>
</template>

<script setup lang="ts">
import SectionArticlesCard from '~/components/PostPage/SectionArticlesCard.vue'
import type { Post } from '~/types/types'

// Define component props
const props = defineProps<{ posts: Post[]; title?: string }>()

// Initial number of items to show
const initialItemsToShow = 9
const itemsToShow = ref(initialItemsToShow)

// Compute the visible posts based on the number of items to show
const visiblePosts = computed(() => props.posts.slice(0, itemsToShow.value))

// Function to load more items
const loadMore = () => {
  itemsToShow.value = Math.min(
    itemsToShow.value + initialItemsToShow,
    props.posts.length,
  )
}

// Function to load fewer items
const loadLess = () => {
  itemsToShow.value = Math.max(
    itemsToShow.value - initialItemsToShow,
    initialItemsToShow,
  )
}
</script>
