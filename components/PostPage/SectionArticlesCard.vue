<template>
  <NuxtLink :to="`/post/${post.id}`">
    <div class="h-[280px] w-full relative rounded-xl overflow-hidden">
      <NuxtImg :src="post.image" :alt="post.image" class="size-full object-cover" />
      <NuxtLink
        :to="`/post/category/${formatedSlug(post.category)}`"
        class="absolute right-4 top-4 bg-black/25 rounded-lg px-2.5 py-2 uppercase text-white font-bold text-[10px] backdrop-blur-sm tracking-[0.015em]"
      >
        {{ post.category }}
      </NuxtLink>
    </div>
    <div>
      <p class="text-xs text-dark-grey-1 py-4">
        {{ formatedDate(post.created_at) }}
      </p>
      <h4 class="font-semibold leading-[160%]">
        {{ post.title }}
      </h4>
      <p class="text-sm text-dark-grey-1 pt-4">
        {{ post.content }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { formatedDate } from '~/scripts/formatedDate'
import { formatedSlug } from '~/scripts/formatedSlug'
import type { Post } from '~/types/types'
defineProps<{ post: Post }>()
</script>