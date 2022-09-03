import { storeToRefs } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

import useAuth from "@/composables/useAuth";

import HomePage from "@/pages/home/HomePage.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import UsersPageVue from "@/pages/users/UsersPage.vue";
import AppointmentsPage from "@/pages/appointments/AppointmentsPage.vue";
import EditAppointmentPage from "@/pages/appointments/EditAppointmentPage.vue";
import ConfirmAppointmentPageVue from "@/pages/appointments/ConfirmAppointmentPage.vue";
import SurveysPage from "./pages/surveys/SurveysPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
      meta: { layout: "AuthorizedLayout" },
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/users",
      name: "users",
      component: UsersPageVue,
      meta: { layout: "AuthorizedLayout" },
    },
    {
      path: "/appointments",
      name: "appointments",
      component: AppointmentsPage,
      meta: { layout: "AuthorizedLayout" },
    },
    {
      path: "/appointments/edit",
      name: "edit-appointment",
      component: EditAppointmentPage,
      meta: { layout: "AuthorizedLayout" },
    },
    {
      path: "/appointments/ok",
      name: "confirm-appointment",
      component: ConfirmAppointmentPageVue,
      meta: { layout: "AuthorizedLayout" },
    },
    {
      path: "/surveys",
      name: "surveys",
      component: SurveysPage,
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
