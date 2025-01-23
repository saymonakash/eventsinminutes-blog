<template>
  <section class="main-container" v-if="post">
    <div class="xl:h-[70px] h-10 md:h-16 w-full" />
    <div class="flex flex-col gap-3 md:gap-5 max-w-[720px] mx-auto">
      <NuxtLink
        :to="`/post/category/${formatedSlug(post.category)}`"
        class="text-sm font-medium text-dark/70"
      >
        {{ post.category }}
      </NuxtLink>
      <h1 class="text-4xl md:text-5xl font-semibold">{{ post.title }}</h1>
      <div class="flex items-center gap-2 font-medium text-dark/70">
        <p>{{ formatedDate(post.created_at) }}</p>
        <span>•</span>
        <p>{{ readTime }}</p>
      </div>
    </div>
    <div class="h-10 w-full"></div>
    <div class="w-full">
      <NuxtImg
        :src="post.image"
        :alt="post.image"
        class="size-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="h-10 w-full"></div>
    <div class="prose max-w-[720px] mx-auto" v-html="post.content"></div>
    <div class="xl:h-24 h-10 md:h-16 w-full" />
    <hr />
    <div class="flex items-center gap-2 mt-5">
      <button
        @click="toggleLike"
        :class="{
          'text-red-500': liked,
          'text-gray-500': !liked,
        }"
        class="flex items-center gap-2 px-4 py-2 border rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
          />
        </svg>
        <span class="font-semibold">{{ likes }}</span>
        <span v-if="liked">Liked</span>
        <span v-else>Like</span>
      </button>
    </div>
    <CommentsSection />
  </section>
</template>

<script setup lang="ts">
import CommentsSection from '~/components/PostDetails/CommentsSection.vue'
import { formatedDate } from '~/scripts/formatedDate'
import { formatedSlug } from '~/scripts/formatedSlug'
import type { Post } from '~/types/types'

// Get the post ID from the route parameters
const id = useRoute().params.id

// Initialize Supabase client
const supabase = useSupabaseClient<Post>()

// Reactive references for post data, likes, and liked status
const post = ref<Post>()
const likes = ref(0)
const liked = ref(false)
const readTime = ref('')

// Calculate the read time based on the content length
const calculateReadTime = (text: string) => {
  const wordsPerMinute = 200 // Average reading speed
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Fetch the post data when the component is mounted
onMounted(async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching post:', error)
  } else {
    post.value = data as Post
    if (post.value && post.value.content) {
      readTime.value = calculateReadTime(post.value.content)
    }
    likes.value = post.value.likes || 0
    liked.value = localStorage.getItem(`liked_${post.value.id}`) === 'true'
  }
})

// Toggle the like status and update the likes count
const toggleLike = async () => {
  if (!post.value) return

  liked.value = !liked.value
  likes.value += liked.value ? 1 : -1
  localStorage.setItem(`liked_${post.value.id}`, liked.value.toString())

  const { error } = await supabase
    .from('posts')
    .update({ likes: likes.value })
    .eq('id', post.value.id)

  if (error) {
    console.error('Error updating likes:', error)
    // Revert the like status and likes count in case of an error
    liked.value = !liked.value
    likes.value += liked.value ? 1 : -1
    localStorage.setItem(`liked_${post.value.id}`, liked.value.toString())
  }
}
</script>
