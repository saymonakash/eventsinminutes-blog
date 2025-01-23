<template>
  <section class="main-container" v-if="post">
    <div class="xl:h-[70px] h-10 md:h-16 w-full" />
    <div class="flex flex-col gap-3 md:gap-5 max-w-[720px] mx-auto">
      <NuxtLink
        :to="`/post/category/${formatedSlug(post.category)}`"
        class="text-sm font-medium text-dark/70"
        >{{ post.category }}</NuxtLink
      >
      <h1 class="text-4xl md:text-5xl font-semibold">{{ post.title }}</h1>
      <div class="flex items-center gap-2 font-medium text-dark/70">
        <p>{{ formatedDate(post.created_at) }}</p>
        <span>•</span>
        <p>{{ readTime }}</p>
      </div>
    </div>
    <div class="h-10 w-full"></div>
    <div class="w-full">
      <NuxtImg :src="post.image" class="size-full object-cover" loading="lazy" />
    </div>
    <div class="h-10 w-full"></div>
    <div class="prose max-w-[720px] mx-auto" v-html="post.content"></div>
    <div class="xl:h-24 h-10 md:h-16 w-full" />
    <hr />
    <CommentsSection />
  </section>
</template>

<script setup lang="ts">
import CommentsSection from "~/components/PostDetails/CommentsSection.vue";
import { formatedDate } from "~/scripts/formatedDate";
import { formatedSlug } from "~/scripts/formatedSlug";
import type { Post } from "~/types/types";

const id = useRoute().params.id;
const supabase = useSupabaseClient();
const post = ref<Post>();
const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200; // Average case.
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

const readTime = ref("");

onMounted(async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) console.error("Error fetching posts:", error);
  else {
    post.value = data as Post;
    if (post.value && post.value.content) {
      readTime.value = calculateReadTime(post.value.content);
    }
  }
});
</script>
