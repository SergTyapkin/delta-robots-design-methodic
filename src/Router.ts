import { createRouter, createWebHistory, Router } from 'vue-router';

// Components:
import { RouteRecordRaw } from 'vue-router';
import Page1Modification from "~/views/Page1Modification.vue";
import Page3Specialization from "~/views/Page3Specialization.vue";
import Page404 from "~/views/Page404.vue";
import Page4Kinematics from "~/views/Page4Kinematics.vue";
import Page2Connections from "~/views/Page2Connections.vue";
import Page6CrossSections from "~/views/Page6CrossSections.vue";
import Page7Materials from "~/views/Page7Materials.vue";
import Page8Drives from "~/views/Page8Drives.vue";
import Page9Deformations from "~/views/Page9Deformations.vue";
import Page0Default from "~/views/Page0Default.vue";
import Page10Results from "~/views/Page10Results.vue";
import Page5Trajectories from "~/views/Page5Trajectories.vue";

type MyRoute = RouteRecordRaw & {
  path: string,
  meta?: {
    noLoginRequired?: boolean
    loginRequired?: boolean
  }
}

export default function createVueRouter(): Router {
  console.log("BASE_URL:", import.meta.env.BASE_URL);
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

  const routesList: MyRoute[] = [
    { path: `${baseUrl}/`, name: 'default', component: Page0Default },
    { path: `${baseUrl}/modification`, name: 'modification', component: Page1Modification },
    { path: `${baseUrl}/connections`, name: 'connections', component: Page2Connections },
    { path: `${baseUrl}/specialization`, name: 'specialization', component: Page3Specialization },
    { path: `${baseUrl}/kinematics`, name: 'kinematics', component: Page4Kinematics },
    { path: `${baseUrl}/trajectories`, name: 'trajectories', component: Page5Trajectories },
    { path: `${baseUrl}/cross-sections`, name: 'crossSections', component: Page6CrossSections },
    { path: `${baseUrl}/materials`, name: 'materials', component: Page7Materials },
    { path: `${baseUrl}/drives`, name: 'drives', component: Page8Drives },
    { path: `${baseUrl}/deformations`, name: 'deformations', component: Page9Deformations },
    { path: `${baseUrl}/results`, name: 'results', component: Page10Results },

    { path: '/:pathMatch(.*)*', component: Page404},
  ];

  const Router = createRouter({
    history: createWebHistory(),
    routes: routesList,
  });

  // Router.beforeResolve(async () => {
  //   if (window?.onbeforeunload) {
  //     if (confirm('Изменения не сохранены. Вы уверены, что хотите покинуть страницу?')) {
  //       window.onbeforeunload = null;
  //     } else {
  //       return false;
  //     }
  //   }
  // });

  return Router;
}
