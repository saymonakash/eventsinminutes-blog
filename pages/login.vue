<template>
  <section
    class="fixed inset-0 flex items-center justify-center py-10 bg-white">
    <div class="w-[400px]">
      <div class="text-center mb-6">
        <h4 class="text-2xl font-medium mb-3">Welcome Back!</h4>
        <p class="text-gray-500">Login to your account</p>
      </div>
      <form @submit.prevent="login" class="flex flex-col gap-5">
        <div class="relative">
          <label for="email" class="block font-semibold mb-1">Email</label>
          <input
            v-model="email"
            @blur="validateEmail"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            :class="[
              'w-full border rounded-lg p-4 placeholder-gray-500 text-sm focus:outline-none',
              emailError ? 'border-red-500' : 'border-gray-300',
            ]" />
          <span
            v-if="emailError"
            class="text-red-500 text-sm absolute top-full left-0 mt-1">
            {{ emailError }}
          </span>
        </div>
        <div class="relative">
          <label for="password" class="block font-semibold">Password</label>
          <input
            v-model="password"
            @blur="validatePassword"
            :type="showPassword ? 'text' : 'password'"
            id="password"
            name="password"
            placeholder="Enter Password"
            :class="[
              'w-full border rounded-lg p-4 placeholder-gray-500 text-sm focus:outline-none',
              passwordError ? 'border-red-500' : 'border-gray-300',
            ]" />
          <button
            type="button"
            @click="togglePasswordVisibility"
            class="absolute right-3 bottom-4 text-sm text-gray-500">
            <NuxtImg
              :src="
                showPassword ? '/icons/icon-eye-off.svg' : '/icons/icon-eye.svg'
              "
              class="w-5 h-5" />
          </button>
          <span
            v-if="passwordError"
            class="text-red-500 text-sm absolute left-0 top-full mt-1">
            {{ passwordError }}
          </span>
        </div>
        <div class="flex justify-between items-center py-2">
          <div class="flex items-center">
            <input
              v-model="rememberMe"
              type="checkbox"
              id="remember-me"
              class="form-checkbox h-4 w-4 text-primary transition duration-150 ease-in-out" />
            <label for="remember-me" class="ml-2 block text-sm text-gray-500">
              Remember Me
            </label>
          </div>
          <NuxtLink
            to="/Forgot-Password"
            class="text-sm text-primary hover:underline">
            Forgot Password
          </NuxtLink>
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-primary text-white px-5 text-sm font-semibold rounded-full min-h-12">
            Login
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>

definePageMeta({
  middleware: "auth",
});

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const showPassword = ref(false);
const rememberMe = ref(false);
const router = useRouter();
const client = useSupabaseClient();

// Validate email format
const validEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate email input
const validateEmail = () => {
  emailError.value = "";
  if (!email.value) {
    emailError.value = "Email is required";
  } else if (!validEmail(email.value)) {
    emailError.value = "Invalid email format";
  }
};

// Validate password input
const validatePassword = () => {
  passwordError.value = "";
  if (!password.value) {
    passwordError.value = "Password is required";
  } else if (password.value.length < 8) {
    passwordError.value = "Password must be at least 8 characters";
  }
};

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Load saved credentials if "Remember Me" is checked
onMounted(() => {
  const savedEmail = localStorage.getItem("rememberMeEmail");
  const savedPassword = localStorage.getItem("rememberMePassword");
  if (savedEmail && savedPassword) {
    email.value = savedEmail;
    password.value = savedPassword;
    rememberMe.value = true;
  }
});

// Watch for changes in "Remember Me" checkbox and save/remove credentials
watch(rememberMe, (newValue) => {
  if (newValue) {
    localStorage.setItem("rememberMeEmail", email.value);
    localStorage.setItem("rememberMePassword", password.value);
  } else {
    localStorage.removeItem("rememberMeEmail");
    localStorage.removeItem("rememberMePassword");
  }
});

// Watch for changes in email and password and save credentials if "Remember Me" is checked
watch([email, password], () => {
  if (rememberMe.value) {
    localStorage.setItem("rememberMeEmail", email.value);
    localStorage.setItem("rememberMePassword", password.value);
  }
});

// Handle login
const login = async () => {
  validateEmail();
  validatePassword();
  if (emailError.value || passwordError.value) return;

  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.error(error.message);
    passwordError.value = "Incorrect email or password. Please try again.";
  } else {
    router.push("/admin");
  }
};
</script>
