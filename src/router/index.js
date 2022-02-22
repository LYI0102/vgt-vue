import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/backend/Home.vue";
import Member from "../views/backend/Member.vue";
import Appeal from "../views/backend/Appeal.vue";
import AppealRply from "../views/backend/AppealRply.vue";
import Discount from "../views/backend/Discount.vue";
import News from "../views/backend/News.vue";
import Order from "../views/backend/Order.vue";
import OrderCmmt from "../views/backend/OrderCmmt.vue";
import Product from "../views/backend/Product.vue";
import ProductCmmt from "../views/backend/ProductCmmt.vue";
import Record from "../views/backend/Record.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/vgt/Member",
    name: "Member",
    component: Member,
    meta: {
      title: '會員資料'
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/member.vue"),
  },
  {
    path: "/vgt/Appeal",
    name: "appeal",
    component: Appeal,
    meta: {
      title: '申訴資料'
    },
    children: [
      {
        path: "/AppealRply",
        name: "appealRply",
        component: AppealRply,
        meta: {
          title: '申訴回覆'
        }
      },
    ]
  },


  {
    path: "/vgt/News",
    name: "news",
    component: News,
    meta: {
      title: '公告資料'
    }
  },
  {
    path: "/vgt/Order",
    name: "order",
    component: Order,
    meta: {
      title: '訂單資料'
    },
    children: [
      {
        path: "/OrderCmmt",
        name: "orderCmmt",
        component: OrderCmmt,
        meta: {
          title: '訂單留言'
        }
      },
    ]
  },

  {
    path: "/vgt/Product",
    name: "product",
    component: Product,
    meta: {
      title: '商品資料'
    },
    children: [
      {
        path: "/Discount",
        name: "discount",
        component: Discount,
        meta: {
          title: '商品折扣'
        }
      },
      {
        path: "/ProductCmmt",
        name: "productCmmt",
        component: ProductCmmt,
        meta: {
          title: '商品留言'
        }
      },
    ]
  },

  {
    path: "/vgt/Record",
    name: "record",
    component: Record,
    meta: {
      title: '儲值歷程'
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
