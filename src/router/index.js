import { createRouter, createWebHistory } from "vue-router";
import Member from "../views/Member.vue";
import Appeal from "../views/Appeal.vue";
import AppealRply from "../views/AppealRply.vue";
import Discount from "../views/Discount.vue";
import News from "../views/News.vue";
import Order from "../views/Order.vue";
import OrderCmmt from "../views/OrderCmmt.vue";
import Product from "../views/Product.vue";
import ProductCmmt from "../views/ProductCmmt.vue";
import Record from "../views/Record.vue";
const routes = [
  {
    path: "/",
    name: "member",
    component: Member,
  },
  // {
  //   path: "/vgt/Member",
  //   name: "Member",
  //   component: Member,
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/member.vue"),
  // },
  {
    path: "/vgt/Appeal",
    name: "appeal",
    component: Appeal,
  },
  {
    path: "/vgt/AppealRply",
    name: "appealRply",
    component: AppealRply,
  },
  {
    path: "/vgt/Discount",
    name: "discount",
    component: Discount,
  },
  {
    path: "/vgt/News",
    name: "news",
    component: News,
  },
  {
    path: "/vgt/Order",
    name: "order",
    component: Order,
  },
  {
    path: "/vgt/OrderCmmt",
    name: "orderCmmt",
    component: OrderCmmt,
  },
  {
    path: "/vgt/Product",
    name: "product",
    component: Product,
  },
  {
    path: "/vgt/ProductCmmt",
    name: "productCmmt",
    component: ProductCmmt,
  },
  {
    path: "/vgt/Record",
    name: "record",
    component: Record,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
