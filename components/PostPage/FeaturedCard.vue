<template>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 md:gap-[22px] bg-white rounded-3xl overflow-hidden shadow-300"
  >
    <div class="aspect-[611/413]">
      <NuxtImg
        :src="post.image"
        :alt="post.image"
        class="size-full object-cover"
        loading="lazy"
      />
    </div>
    <div class="px-6 py-[30px] flex flex-col gap-4 md:gap-[22px]">
      <p class="text-dark/70 text-sm">
        {{ formatedDate(post.created_at) }}
      </p>
      <h2 class="md:text-[33px] text-2xl leading-[140%] font-medium">
        {{ post.title }}
      </h2>
      <p class="text-dark/70 leading-[160%] tracking-[0.005em]">
        {{ post.content }}
      </p>
      <hr />

      <div class="flex items-center justify-between">
        <NuxtLink
          :to="`/post/category/${formatedSlug(post.category)}`"
          class="font-semibold text text-dark/70 px-2.5 py-3 rounded-lg bg-primary/5"
        >
          {{ post.category }}
        </NuxtLink>
        <NuxtLink
          :to="`/post/${post.id}`"
          class="text-dark font-medium flex items-center gap-1"
        >
          <span>Read</span>
          <NuxtImg src="/images/icons/icon-arrow-right.svg" class="size-4" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatedDate } from '~/scripts/formatedDate'
import { formatedSlug } from '~/scripts/formatedSlug'
import type { Post } from '~/types/types'

defineProps<{
  post: Post
}>()
</script>
