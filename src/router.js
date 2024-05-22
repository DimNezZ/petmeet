import { createWebHashHistory, createRouter } from "vue-router";

import MainPage from "./pages/MainPage.vue";
import AccountPage from "./pages/AccountPage.vue";
import AuthorizationPage from "./pages/AuthorizationPage.vue";
import { isAurhorized } from "./utils/user";

const routes = [
  { 
    path: "/", 
    component: MainPage, 
    props: route => ({ petId: route.query.petId }) 
  },
  { path: "/account", component: AccountPage },
  { path: "/auth", component: AuthorizationPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  if (!isAurhorized() && to.path !== "/auth") {
    return { path: "/auth" };
  }
  if (isAurhorized() && to.path === "/auth") {
    return { path: "/" };
  }
});
