import '@/assets/css/common.css'

import { createApp } from 'vue'
import hooks from '@/hooks'
import { useRouter } from '@/router'
import App from '@/App.vue'

const app = createApp(App)
hooks.pinia(app);
useRouter(app)
app.mount('#app')