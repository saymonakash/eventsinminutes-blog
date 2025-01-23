<template>
  <div class="max-w-[720px] mx-auto my-10 md:my-20">
    <h2 class="text-2xl font-semibold mb-4">Comments</h2>
    <div v-if="comments.length">
      <div
        v-for="(comment, i) in comments"
        :key="i"
        class="mb-4 p-4 border rounded-lg relative"
      >
        <div class="flex items-center gap-4">
          <div class="size-10 rounded-full overflow-hidden">
            <NuxtImg class="size-full" src="/images/icons/icon-user.svg" />
          </div>
          <div>
            <p class="font-medium">Anonymous</p>
            <p class="text-sm text-gray-500">
              <span>{{ formatedDate(comment.created_at) }}</span> at
              <span>{{
                new Date(comment.created_at).toLocaleTimeString()
              }}</span>
            </p>
            <p v-if="comment.commented_by" class="text-sm text-gray-500">
              By: {{ comment.commented_by }}
            </p>
          </div>
        </div>
        <p class="mt-8 text-sm text-grey">{{ comment.text }}</p>

        <!-- Delete button Only visible to the user who commented or Admin mail  example@gmail.com -->
        <button
          v-if="
            (user && user.id === comment.commented_by) ||
            (user && user.email === 'example@gmail.com')
          "
          @click="deleteComment(comment.id)"
          class="absolute top-4 right-4 text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
    <div v-else>
      <p>No comments yet. Be the first to comment!</p>
    </div>
    <div class="mt-6" v-if="user">
      <textarea
        v-model="newComment"
        class="w-full p-4 border rounded-lg"
        rows="6"
        placeholder="Write your comment here..."
      ></textarea>
      <button
        @click="submitComment"
        class="mt-4 px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white duration-300"
      >
        Submit Comment
      </button>
    </div>
    <div v-else>
      <p>You must be logged in to comment.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatedDate } from '~/scripts/formatedDate'
const user = useSupabaseUser()
const supabase = useSupabaseClient()
const postId = useRoute().params.id
const comments = ref<Comment[]>([])
const newComment = ref()

const fetchComments = async () => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: false })
  if (error) console.error('Error fetching comments:', error)
  else comments.value = data
}

interface Comment {
  id: string
  post_id: string
  text: string
  created_at: string
  commented_by: string
}

const submitComment = async () => {
  if (!newComment.value.trim()) return
  const { data, error } = await supabase.from('comments').insert({
    post_id: postId,
    text: newComment.value,
    created_at: new Date().toISOString(),
    commented_by: user.value?.id,
  })
  if (error) console.error('Error submitting comment:', error)
  else if (data) {
    comments.value.unshift(data)
    newComment.value = ''
  }
}

const deleteComment = async (commentId: string) => {
  const { error } = await supabase.from('comments').delete().eq('id', commentId)
  if (error) console.error('Error deleting comment:', error)
  else
    comments.value = comments.value.filter(
      (comment) => comment.id !== commentId,
    )
}

onMounted(fetchComments)

watch(comments, fetchComments)
</script>
