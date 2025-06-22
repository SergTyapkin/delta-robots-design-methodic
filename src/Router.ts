import { createRouter, createWebHistory, Router } from 'vue-router';
import { type Store } from '~/types/store';

// Components:
import routes from '~/routes';
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
  path: keyof typeof routes,
  meta?: {
    noLoginRequired?: boolean
    loginRequired?: boolean
  }
}

export default function createVueRouter(_: Store): Router {
  const routesList: MyRoute[] = [
    { path: '/', name: 'default', component: Page0Default },
    { path: '/modification', name: 'modification', component: Page1Modification },
    { path: '/specialization', name: 'specialization', component: Page3Specialization },
    { path: '/connections', name: 'connections', component: Page2Connections },
    { path: '/kinematics', name: 'kinematics', component: Page4Kinematics },
    { path: '/dynamics', name: 'dynamics', component: Page1Modification },
    { path: '/trajectories', name: 'trajectories', component: Page1Modification },
    { path: '/cross-sections', name: 'crossSections', component: Page5CrossSections },
    { path: '/materials', name: 'materials', component: Page6Materials },
    { path: '/drives', name: 'drives', component: Page7Drives },
    { path: '/deformations', name: 'deformations', component: Page8Deformations },
    { path: '/results', name: 'results', component: Page9Results },

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
