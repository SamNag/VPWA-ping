import { RouteRecordRaw } from 'vue-router';
import UsersPage from 'src/pages/UsersPage.vue'; // Import your new component

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'users', component: UsersPage },
      {path: 'chat', component: () => import('pages/ChatPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
