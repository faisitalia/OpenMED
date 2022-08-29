import useAuth from "@/composables/useAuth";
import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../pages/home/HomePage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { layout: "AuthorizedLayout" },
    },
  ],
});

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login", "/about", "/signup"];
  const authRequired = !publicPages.includes(to.path);

  const { isAuthenticated } = storeToRefs(useAuth());

  // TODO we need to check roles, too, afterwards.
  if (authRequired && !isAuthenticated) return "/login";
});

export default router;
