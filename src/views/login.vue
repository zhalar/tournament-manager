<template>
  <div class="container-fluid">
    <div class="row justify-content-center login-container align-items-center">
      <div class="col-11 col-sm-8 col-md-4 loginBox p-5 ">
        <h4 class="text-center">Sistema administrador de torneos</h4>
        <img src="../assets/images/hola.png" class="mt-2" alt="" style="width:100%; border-radius: 10px;"/>
        <form @submit.prevent="Login(!v$.$invalid)" class="mt-3">
          <div>
            <div class="d-flex flex-column">
                <label for="username">Usuario</label>
                <InputText id="username" type="text" v-model="data.user" />
            </div>
          </div>
          <div>
            <div class="d-flex flex-column">
                <label for="username">Contraseña</label>
                <InputText id="password" type="password" v-model="data.password" />
            </div>
          </div>
          <div class="row mt-3 justify-content-center">
            <div class="col-12 col-md-6">
                <Button label="Iniciar sesión" type="submit" class="p-button-warning w-100"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
	
</template>

<script>
import { reactive } from '@vue/reactivity'
import router from "../router/route";
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import AxiosCall from "@/scripts/axioscall";
import NotifyCall from "@/scripts/notifycall";
import { useGeneralStore} from "../stores/general.js";
import { useToast } from 'primevue/usetoast';

export default {
  name: "Login",
  components:{
    Menubar,
    InputText,
    Button
  },
  setup() {
    const generalStore = useGeneralStore();
    const data = reactive({
			user: '',
			password: '',
			formSubmited: false,
		})
    const rules = {
			user: { required },
			password: { required },
		}
    const v$ = useVuelidate(rules, data)

    onMounted(() => {
      InitToast();
    });

    function InitToast() {
			generalStore.setToast(useToast());
		}

    function Login(isFormValid) {
			data.formSubmited = true
			if (!isFormValid) return
			const LOGIN_PARAMETERS = {
				url: process.env.VUE_API.AUTHENTICATE,
                datauser: {
                    user: data.user,
					          password: data.password,
                }
			}
      generalStore.authRequest(LOGIN_PARAMETERS).then(
          (response) => {
              if(response.status === 0){
                  router.replace(`/main`);
                  const welcomemsg = "Bienvenido de vuelta " + response.user.name + "!!"
                  NotifyCall.Success("Sesión iniciada",welcomemsg)
              }
          }
      );
			data.formSubmited = false
		}

    return {
      data,
      v$,
      Login
    }
  }
}
</script>

<style scoped>
  .loginBox {
    background-color: rgba(0, 0, 0, 0.616);
    border-radius: 10px;
    color: #fff;
  }
  .login-container{
    height: 100vh;
    background-image: url("@/assets/images/login_background.jpg");
    background-repeat: no-repeat, repeat;
    background-size: cover;
    backdrop-filter: blur(15px);
  }

</style>
