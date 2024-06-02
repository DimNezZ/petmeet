import { createWebHashHistory, createRouter } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import AccountPage from '@/pages/AccountPage.vue';
import AuthorizationPage from '@/pages/AuthorizationPage.vue';
import { isAuthorized } from '@/utils/user';

const routes = [
  { path: '/feed', component: MainPage },
  { path: '/', component: AccountPage },
  { path: '/auth', component: AuthorizationPage },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async to => {
  if (!isAuthorized() && to.path !== '/auth') {
    return { path: '/auth' };
  }

  if (isAuthorized() && to.path === '/auth') {
    return { path: '/' };
  }
});
