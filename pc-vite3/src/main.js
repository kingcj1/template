/*
 * @Author: kingcj
 * @Date: 2023-01-05 16:17:53
 * @LastEditors: kingcj
 * @LastEditTime: 2023-02-15 11:08:06
 * Copyright (c) 2023 by kingcj, All Rights Reserved. 
 */
import '@/assets/css/common.css';
import 'element-plus/es/components/message/style/css';
import { createApp } from 'vue';
import hooks from '@/hooks';
import { useRouter } from '@/router';
import App from '@/App.vue';

const app = createApp(App);
hooks.pinia(app);
useRouter(app);
app.mount('#app');