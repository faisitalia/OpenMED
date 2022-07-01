export default defineNuxtRouteMiddleware(async (to, _) => {
  const { isAuthenticated } = useAuth();

  const clearRoutes = [
    "/login",
    "/about",
    "/forgot-password",
    "/reset-password",
  ];

  const isProtectedRoute = !clearRoutes.some((route) =>
    to.path.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!isAuthenticated) return navigateTo("/login");
    // No redirect needed
    return;
  }

  // The login page should be accessible iff we're not authenticated
  if (isAuthenticated) return navigateTo("/");
});
