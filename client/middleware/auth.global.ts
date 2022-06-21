export default defineNuxtRouteMiddleware(async (to, _) => {
  const authStore = useAuthStore();
  const clearRoutes = [
    "/login",
    "/about",
    "/forgot-password",
    "/reset-password",
  ];

  const isAuthenticated = authStore.isAuthenticated;
  console.log(isAuthenticated);

  const isProtectedRoute = !clearRoutes.some((route) =>
    to.path.startsWith(route)
  );
  console.log(isProtectedRoute);

  // when we're accessing "login" pages
  if (isProtectedRoute) {
    // If we aren't logged in, redirect to the login
    if (!isAuthenticated) {
      return navigateTo("/login");
    }

    // Otherwise, we're good to go
    return;
  }

  // here, we're accessing non-protected routes
  if (isAuthenticated) {
    // If we're logged in, redirect to the login page
    return navigateTo("/");
  }
});
