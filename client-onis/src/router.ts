import { createRouter, createWebHistory } from "vue-router";

import { useAuth } from "./composables/useAuth";

import HomePage from "@/pages/home/HomePage.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import SurveysPage from "@/pages/surveys/SurveysPage.vue";
import ProjectPage from "@/pages/project/ProjectPage.vue";
import AccountPage from "@/pages/account/AccountPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { layout: "OnisLayout" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/surveys",
      name: "surveys",
      component: SurveysPage,
      meta: { layout: "OnisLayout" },
    },
    {
      path: "/project",
      name: "project",
      component: ProjectPage,
      meta: { layout: "OnisLayout" },
    },
    {
      path: "/account",
      name: "account",
      component: AccountPage,
      meta: { layout: "OnisLayout" },
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/", "/login", "/project"];
  const authenticationRequired = !publicPages.includes(to.path);

  const { isAuthenticated } = useAuth();

  if (authenticationRequired && !isAuthenticated) return "/login";
});

export default router;
