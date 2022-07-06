import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'animate.css'

//导入element的icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App);
//循坏注册所有的icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(createPinia()).use(router).mount('#app')
