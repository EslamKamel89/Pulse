export default defineNuxtRouteMiddleware(async (to, from) => {
  const session = useUserSession();
  if (!session.loggedIn.value) {
    return navigateTo("/auth");
  }
});
