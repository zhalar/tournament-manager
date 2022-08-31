import { defineStore } from 'pinia'
import router from "@/router/route";
import AxiosCall from "@/scripts/axioscall";

import {
	KEY_SESSION_STORAGE
} from "@/scripts/constant";

export const useGeneralStore = defineStore({
  id: 'general',
	state: () => {
		return {
			languageName: '',
			toast: {},
			session: {},
			user: {},

		}
	},
	getters: {},
	actions: {
		setToast(toast) {
			this.toast = toast;
		},
		authSuccess({ session, user, language }) {
			this.session = session;
			this.user = user;
			this.language = language;
		},
		authLogOut() {
			this.session = {};
			this.user = {};
			sessionStorage.removeItem(KEY_SESSION_STORAGE.KEY_TOKEN);
			sessionStorage.removeItem(KEY_SESSION_STORAGE.KEY_USER);
			sessionStorage.removeItem(KEY_SESSION_STORAGE.KEY_APPMAPPING);
		},
		authRequest(loginParameters) {
			return new Promise((resolve, reject) => {
				AxiosCall.Post(loginParameters.url, loginParameters.datauser)
					.then((response) => {
						const {
							data: { session, user, status, appmapping },
						} = response; //TODO: appmapping
						if (status === 0) {
							const SESSION = {
								session,
								user,
							};
							sessionStorage.setItem(
								KEY_SESSION_STORAGE.KEY_TOKEN,
								JSON.stringify(SESSION.session)
							);
							sessionStorage.setItem(
								KEY_SESSION_STORAGE.KEY_USER,
								Buffer.from(JSON.stringify(SESSION.user)).toString("base64")
							);
							this.authSuccess(SESSION);
							resolve(response.data);
						}
						
					})
					.catch((err) => {
						this.authLogOut();
						reject(err);
					});
			});
		},
		finishSession() {
			this.authLogOut();
			router.replace(`/login`);
		},
		authValidSession() {
			return new Promise((resolve) => {
				const TOKEN = sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_TOKEN);
				let sessionActive = false;
				if (TOKEN) {
					const SESSION = {
						session: JSON.parse(TOKEN),
						user: JSON.parse(
							Buffer.from(
								sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_USER),
								"base64"
							)
						),
						language: JSON.parse(
							Buffer.from(
								sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_LANGUAGE),
								"base64"
							)
						),
					};
					this.authSuccess(SESSION);
					sessionActive = true;
				} 
        "administrador@ejemplo1.com",
				resolve(sessionActive);
			});
		}
	}
})