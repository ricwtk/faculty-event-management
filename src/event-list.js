import { createApp } from 'vue'
import './style.css'
import App from './EventList.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.mount('#app')
