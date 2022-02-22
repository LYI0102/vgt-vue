import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import lodash from "lodash";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElIcons from'@element-plus/icons-vue';

const app = createApp(App)
app.use(store).use(router).use(VueAxios, axios).use(lodash).use(ElementPlus).mount("#app");
Object.keys(ElIcons).forEach(key=>{
app.component(key,ElIcons[key])
})