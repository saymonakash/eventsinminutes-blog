export default defineNuxtRouteMiddleware(async (to) => {
  const session = useSupabaseSession();
  if (!session && to.path.startsWith("/admin")) {
    return navigateTo("/login");
  }
});
