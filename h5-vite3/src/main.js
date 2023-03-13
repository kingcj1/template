import '@/assets/css/common.css';
import '@nutui/nutui/dist/packages/toast/style';
import { useRouter } from '@/router';
import { createApp } from 'vue';
import hooks from '@/hooks';
import App from '@/App.vue';

const app = createApp(App);
hooks.pinia(app);
hooks.vconsole(app);
useRouter(app);
app.mount('#app');
