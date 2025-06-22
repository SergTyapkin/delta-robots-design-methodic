import { createRouter, createWebHistory, Router } from 'vue-router';

// Components:
import { RouteRecordRaw } from 'vue-router';
import Page1Modification from "~/views/Page1Modification.vue";
import Page3Specialization from "~/views/Page3Specialization.vue";
import Page404 from "~/views/Page404.vue";
import Page4Kinematics from "~/views/Page4Kinematics.vue";
import Page2Connections from "~/views/Page2Connections.vue";
import Page5CrossSections from "~/views/Page5CrossSections.vue";
import Page6Materials from "~/views/Page6Materials.vue";
import Page7Drives from "~/views/Page7Drives.vue";
import Page8Deformations from "~/views/Page8Deformations.vue";
import Page0Default from "~/views/Page0Default.vue";
import Page9Results from "~/views/Page9Results.vue";

type MyRoute = RouteRecordRaw & {
  path: string,
  meta?: {
    noLoginRequired?: boolean
    loginRequired?: boolean
  }
}

export default function createVueRouter(): Router {
  console.log("BASE", import.meta.env.BASE_URL);

  const routesList: MyRoute[] = [
    { path: `${import.meta.env.BASE_URL}/`, name: 'default', component: Page0Default },
    { path: `${import.meta.env.BASE_URL}/modification`, name: 'modification', component: Page1Modification },
    { path: `${import.meta.env.BASE_URL}/specialization`, name: 'specialization', component: Page3Specialization },
    { path: `${import.meta.env.BASE_URL}/connections`, name: 'connections', component: Page2Connections },
    { path: `${import.meta.env.BASE_URL}/kinematics`, name: 'kinematics', component: Page4Kinematics },
    { path: `${import.meta.env.BASE_URL}/dynamics`, name: 'dynamics', component: Page1Modification },
    { path: `${import.meta.env.BASE_URL}/trajectories`, name: 'trajectories', component: Page1Modification },
    { path: `${import.meta.env.BASE_URL}/cross-sections`, name: 'crossSections', component: Page5CrossSections },
    { path: `${import.meta.env.BASE_URL}/materials`, name: 'materials', component: Page6Materials },
    { path: `${import.meta.env.BASE_URL}/drives`, name: 'drives', component: Page7Drives },
    { path: `${import.meta.env.BASE_URL}/deformations`, name: 'deformations', component: Page8Deformations },
    { path: `${import.meta.env.BASE_URL}/results`, name: 'results', component: Page9Results },

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
