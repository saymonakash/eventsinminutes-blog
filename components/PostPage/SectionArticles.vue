<template>
  <div>
    <h3 v-if="title" class="text-2xl font-bold">Popular Articles</h3>
    <div v-if="title" class="h-8 md:h-10 xl:h-[50px]" />
    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 md:gap-y-12">
      <SectionArticlesCard
        v-for="(post, i) in visiblePosts"
        :key="i"
        :post="post" />
    </div>
    <button
      v-if="visiblePosts.length < props.posts.length"
      @click="loadMore"
      class="py-4 px-8 rounded-full text-sm font-medium text-black/70 border border-grey mt-10 md:mt-20">
      View More
    </button>
    <button
      v-if="visiblePosts.length > 9"
      @click="loadLess"
      class="py-4 px-8 rounded-full text-sm font-medium text-black/70 border border-grey mt-16">
      View Less
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import SectionArticlesCard from "~/components/PostPage/SectionArticlesCard.vue";
import type { Post } from "~/types/types";

const props = defineProps<{ posts: Post[]; title?: string }>();
const itemsToShow = ref(9);

const visiblePosts = computed(() => props.posts.slice(0, itemsToShow.value));

const loadMore = () => {
  itemsToShow.value = Math.min(itemsToShow.value + 9, props.posts.length);
};

const loadLess = () => {
  itemsToShow.value = Math.max(itemsToShow.value - 9, 9);
};
</script>
