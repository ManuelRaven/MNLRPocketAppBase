import { useAuth } from "@/composeables/useAuth";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../layouts/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "home",
          component: HomeView,
        },
        {
          path: "/about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("@/views/AboutView.vue"),
        },
        {
          path: "/testing",
          name: "testing",
          component: () => import("@/views/TestingView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/RegisterView.vue"),
    },
  ],
});

//RouteGuard to check if user is authenticated and redirect to login page if not

const unauthorizedRoutes = ["login", "register"];

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = await useAuth().getAuthState();
  if (!isAuthenticated && !unauthorizedRoutes.includes(to.name as string)) {
    next({ name: "login" });
  } else next();
});

export default router;
