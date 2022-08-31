import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import PrimeVue from 'primevue/config';
import router from "@/router/route";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import Toast from "primevue/toast";
import { createPinia } from "pinia";
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

const app = createApp(App);

app.use(ToastService);
app.component("Toast", Toast);
app.use(createPinia());
app.use(PrimeVue);
app.use(router);
app.use(ConfirmationService);
app.mount('#app');


export default app;