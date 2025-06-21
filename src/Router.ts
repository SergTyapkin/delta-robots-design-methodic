import { createRouter, createWebHistory, Router } from 'vue-router';
import { type Store } from '~/types/store';

// Components:
import routes from '~/routes';
import { RouteRecordRaw } from 'vue-router';
import PageModification from "~/views/PageModification.vue";
import PageSpecialization from "~/views/PageSpecialization.vue";
import Page404 from "~/views/Page404.vue";
import PageKinematics from "~/views/PageKinematics.vue";
import PageConnections from "~/views/PageConnections.vue";
import PageCrossSections from "~/views/PageCrossSections.vue";
import PageMaterials from "~/views/PageMaterials.vue";
import PageDrives from "~/views/PageDrives.vue";
import PageDeformations from "~/views/PageDeformations.vue";

type MyRoute = RouteRecordRaw & {
  path: keyof typeof routes,
  meta?: {
    noLoginRequired?: boolean
    loginRequired?: boolean
  }
}

export default function createVueRouter(_: Store): Router {
  const routesList: MyRoute[] = [
    { path: '/', name: 'default', component: PageModification },
    { path: '/specialization', name: 'specialization', component: PageSpecialization },
    { path: '/connections', name: 'connections', component: PageConnections },
    { path: '/kinematics', name: 'kinematics', component: PageKinematics },
    { path: '/dynamics', name: 'dynamics', component: PageModification },
    { path: '/trajectories', name: 'trajectories', component: PageModification },
    { path: '/cross-sections', name: 'crossSections', component: PageCrossSections },
    { path: '/materials', name: 'materials', component: PageMaterials },
    { path: '/drives', name: 'drives', component: PageDrives },
    { path: '/deformations', name: 'deformations', component: PageDeformations },
    // { path: '/results', name: 'results', component: PageModification },

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
