import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from "../components/Dashboard";
import NewEmployee from "../components/NewEmployee";
import EditEmployee from "../components/EditEmployee";
import ViewEmployee from "../components/ViewEmployee";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/new",
    name: "new-employee",
    component: NewEmployee,
  },
  {
    path: "/edit/:id_empleado",
    name: "edit-employee",
    component: EditEmployee,
  },
  {
    path: "/:id_empleado",
    name: "view-employee",
    component: ViewEmployee,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
