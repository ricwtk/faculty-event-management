import { createApp } from 'vue'
import './style.css'
import App from './UserList.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(ToastService)
app.use(ConfirmationService)
app.mount('#app')
