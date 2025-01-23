<!-- This is a dummy component that allows you to create a new post. It contains a form with input fields for the image URL(local Image Url), title, content, and category of the post. When the user clicks the "Create" button, the form data is sent to the Supabase database, and the new post is added to the list of posts displayed on the page. -->
<!-- Just creadt for helping adding new dummy posts -->

<template>
  <div class="main-container mx-auto py-10">
    <!-- Page Title -->
    <div class="text-7xl font-bold flex items-center justify-center mb-10">
      Create Post
    </div>

    <!-- New Post Button -->
    <button
      @click="showModal = true"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
      New Post
    </button>

    <!-- Modal for Creating New Post -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-lg w-96">
        <h2 class="text-2xl mb-4">New Post</h2>
        <input
          v-model="newPost.image"
          placeholder="Image URL"
          class="border p-2 mb-2 w-full" />
        <input
          v-model="newPost.title"
          placeholder="Title"
          class="border p-2 mb-2 w-full" />
        <textarea
          v-model="newPost.content"
          placeholder="Content"
          class="border p-2 mb-2 w-full"></textarea>
        <input
          v-model="newPost.category"
          placeholder="Category"
          class="border p-2 mb-2 w-full" />
        <div class="flex justify-end">
          <button
            @click="createPost"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Create
          </button>
          <button
            @click="showModal = false"
            class="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- Modal for Editing Post -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded shadow-lg w-96">
        <h2 class="text-2xl mb-4">Edit Post</h2>
        <input
          v-model="editPost.image"
          placeholder="Image URL"
          class="border p-2 mb-2 w-full" />
        <input
          v-model="editPost.title"
          placeholder="Title"
          class="border p-2 mb-2 w-full" />
        <textarea
          v-model="editPost.content"
          placeholder="Content"
          class="border p-2 mb-2 w-full"></textarea>
        <input
          v-model="editPost.category"
          placeholder="Category"
          class="border p-2 mb-2 w-full" />
        <div class="flex justify-end">
          <button
            @click="updatePost"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Update
          </button>
          <button
            @click="showEditModal = false"
            class="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <!-- List of Posts -->
    <div class="mt-8">
      <h2 class="text-3xl mb-4">Posts</h2>
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-5 lg:grid-cols-3">
        <NuxtLink
          v-for="(post, i) in posts"
          :key="i"
          class="border p-4 mb-4 rounded shadow">
          <NuxtImg
            :src="post.image"
            alt="Post Image"
            class="w-full h-64 object-cover mb-4" />
          <h3 class="text-2xl font-bold mb-2">{{ post.title }}</h3>
          <p class="text-gray-700 mb-2">{{ post.content }}</p>
          <p class="text-gray-500 mb-2">{{ post.category }}</p>
          <p class="text-gray-400">
            {{ new Date(post.created_at).toLocaleDateString() }}
          </p>
          <NuxtLink
            :to="`/post/${post.id}`"
            class="bg-green-500 text-white px-4 py-2 rounded mt-2 inline-block hover:bg-green-600 transition">
            Preview
          </NuxtLink>
          <button
            @click="
              () => {
                editPost = { ...post };
                showEditModal = true;
              }
            "
            class="bg-yellow-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-yellow-600 transition">
            Edit
          </button>
          <button
            @click="deletePost(post.id)"
            class="bg-red-500 text-white px-4 py-2 rounded mt-2 ml-2 hover:bg-red-600 transition">
            Delete
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import Supabase client
const supabase = useSupabaseClient();

// Reactive references
const showModal = ref(false);
const showEditModal = ref(false);
const posts = ref([]);
const postFields = {
  image: "",
  title: "",
  content: "",
  category: "",
  created_at: new Date().toISOString(),
};
const newPost = ref(postFields);
const editPost = ref(postFields);

// Fetch posts from the database
const fetchPosts = async () => {
  let { data, error } = await supabase.from("posts").select("*");
  if (error) console.error(error);
  else {
    posts.value = data;
  }
};

// Create a new post and reset the form
const createPost = async () => {
  newPost.value.created_at = new Date().toISOString(); // Ensure created_at is updated
  let { data, error } = await supabase.from("posts").insert([newPost.value]);
  if (error) console.error(error);
  else {
    if (data) {
      posts.value.unshift(data[0]);
    }
    newPost.value = {
      image: "",
      title: "",
      content: "",
      category: "",
      created_at: new Date().toISOString(),
    };
    showModal.value = false;
  }
};

// Update an existing post
const updatePost = async () => {
  let { error } = await supabase
    .from("posts")
    .update(editPost.value)
    .eq("id", editPost.value.id);
  if (error) console.error(error);
  else {
    const index = posts.value.findIndex(
      (post) => post.id === editPost.value.id
    );
    if (index !== -1) {
      posts.value[index] = { ...editPost.value };
    }
    showEditModal.value = false;
  }
};

// Delete a post by ID
const deletePost = async (id) => {
  let { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) console.error(error);
  else {
    posts.value = posts.value.filter((post) => post.id !== id);
  }
};

// Fetch posts when the component is mounted
onMounted(fetchPosts);
</script>
