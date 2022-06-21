export default defineNuxtRouteMiddleware(async (to, _) => {
  const authStore = useAuthStore();
  const clearRoutes = [
    "/login",
    "/about",
    "/forgot-password",
    "/reset-password",
  ];

  const isAuthenticated = authStore.isAuthenticated;

  const isProtectedRoute = !clearRoutes.some((route) =>
    to.path.startsWith(route)
  );

  // when we're accessing "login" pages
  if (isProtectedRoute) {
    // If we're logged in, redirect to the home page
    if (!isAuthenticated) {
      return navigateTo("/");
    }

    // Otherwise, we're good to go
    return;
  }

  // here, we're accessing protected routes
  if (isAuthenticated) {
    // If we're not logged in, redirect to the login page
    return navigateTo("/");
  }
});
