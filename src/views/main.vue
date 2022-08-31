<template>
  <div>
    <Menubar :model="data.items">
      <template #start>
        <img alt="logo" src="@/assets/images/logo.png" height="50" class="mr-2">
      </template>
      <template #end>
        <div @click="logout" style="cursor: pointer;">Cerrar sesión</div>
      </template>
    </Menubar>
    <router-view></router-view>
  </div>
	
</template>

<script>
import { reactive } from '@vue/reactivity'
import router from "../router/route";
import Menubar from 'primevue/menubar';
import {
	onMounted
} from "@vue/runtime-core";
import { useGeneralStore } from '../stores/general';
import { useToast } from "primevue/usetoast";
import InputText from 'primevue/inputtext';
import NotifyCall from "@/scripts/notifycall";


export default {
  name: "Main",
  components:{
    Menubar,
    InputText
  },
  setup() {
    const generalStore = useGeneralStore();

    const data = reactive({
      items: []
		});

    onMounted(() => {
			ValidSession();
		});
    function ValidSession() {
			InitToast();
			generalStore.authValidSession().then((isValid) => {
				if (isValid) {
					console.log("Válid Session");
				} else {
					NotifyCall.Info("No ha iniciado sesión");
					generalStore.finishSession();
				}
			});
		}
    function InitToast() {
			generalStore.setToast(useToast());
		}
    function logout() {
      generalStore.finishSession();
      NotifyCall.Info("Ha cerrado sesión");
    }

    return {
      data,
      logout
    }
  }
}
</script>

<style>

</style>