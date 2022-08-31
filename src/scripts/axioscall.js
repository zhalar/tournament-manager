import axios from "axios";
import {
	KEY_SESSION_STORAGE
} from "@/scripts/constant";
import NotifyCall from "@/scripts/notifycall";
import { useGeneralStore } from "@/stores/general";

class AxiosCall {
	constructor() { }

	static Get(url, parameters = {}, contenttype = null) {
		const store = useGeneralStore();
		return new Promise((resolve, reject) => {
			const SESSION =
				JSON.parse(sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_TOKEN)) || {};
			if (SESSION.token === undefined) SESSION.token = "";

			const CONFIG = {
				headers: {
					Authorization: `Bearer ${SESSION.token}`,
					"Content-Type": contenttype || "application/json",
				},
				params: parameters,
			};

			axios
				.get(process.env.VUE_APP_BASEURL + url, CONFIG)
				.then((response) => {
					const {
						data: { status, message },
					} = response;
					if (status === 1) {
						NotifyCall.Error("Error", message);
					}
					else if (status === 2) {
						NotifyCall.Warn(message);
					}
					else if (status === 3) {
						NotifyCall.Info(message);
					}
					resolve(response);
				})
				.catch(({ response: { data } }) => {
					if (data.status) {
						if (data.message === "Token expired" || data.message === "Token missing") {
							NotifyCall.Info("Token expirado");
							store.finishSession();
						} else {
							NotifyCall.Error("Ocurrió un error", data.message);
						}
					} else {
						NotifyCall.Error("Error", data.message);
					}
					reject();
				});
		});
	}

	static Post(
		url,
		parameters = {},
		contenttype = null,
		responseType = null
	) {
		const store = useGeneralStore();
		return new Promise((resolve, reject) => {
			const SESSION =
				JSON.parse(sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_TOKEN)) || {};
			if (SESSION.token === undefined) SESSION.token = "";

			const CONFIG = {
				headers: {
					"Content-Type": contenttype || "application/json",
					Authorization: `Bearer ${SESSION.token}`,
				},
				responseType,
			};

			CONFIG.responseType ? false : delete CONFIG.responseType;
			axios
				.post(process.env.VUE_APP_BASEURL + url, parameters, CONFIG)
				.then((response) => {
					const {
						data: { status, message },
					} = response;
					if (status === 1) {
						NotifyCall.Error("Error", message);
					}
					else if (status === 2) {
						NotifyCall.Warn(message);
					}
					else if (status === 3) {
						NotifyCall.Info(message);
					}
					resolve(response);
				})
				.catch(({ response: { data } }) => {
					if (data.status) {
						if (data.message === "Token expired" || data.message === "Token missing") {
							NotifyCall.Info("Token expirado");
							store.finishSession();
						} else {
							NotifyCall.Error("Ocurrió un error", data.message);
						}
					} else {
						NotifyCall.Error("Error", data.message);
					}
					reject();
				});
		});
	}

	static Put(url, parameters = {}, contenttype) {
		const store = useGeneralStore();
		return new Promise((resolve, reject) => {
			const SESSION =
				JSON.parse(sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_TOKEN)) || {};
			if (SESSION.token === undefined) SESSION.token = "";

			const CONFIG = {
				headers: {
					Authorization: `Bearer ${SESSION.token}`,
					"Content-Type": contenttype || "application/json",
				},
			};
			axios
				.put(process.env.VUE_APP_BASEURL + url, parameters, CONFIG)
				.then((response) => {
					const {
						data: { status, message },
					} = response;
					if (status === 1) {
						NotifyCall.Error("Error", message);
					}
					else if (status === 2) {
						NotifyCall.Warn(message);
					}
					else if (status === 3) {
						NotifyCall.Info(message);
					}
					resolve(response);
				})
				.catch(({ response: { data } }) => {
					if (data.status) {
						if (data.message === "Token expired" || data.message === "Token missing") {
							NotifyCall.Info("Token expirado");
							store.finishSession();
						} else {
							NotifyCall.Error("Ocurrió un error", data.message);
						}
					} else {
						NotifyCall.Error("Error", data.message);
					}
					reject();
				});
		});
	}

	static Delete(url, parameters = {}) {
		return new Promise((resolve, reject) => {
			const SESSION =
				JSON.parse(sessionStorage.getItem(KEY_SESSION_STORAGE.KEY_TOKEN)) || {};
			if (SESSION.token === undefined) SESSION.token = "";

			const CONFIG = {
				headers: {
					Authorization: `Bearer ${SESSION.token} `,
				},
				data: parameters,
			};
			axios
				.delete(process.env.VUE_APP_BASEURL + url, CONFIG)
				.then((response) => {
					const {
						data: { status, message },
					} = response;
					if (status === 1) {
						NotifyCall.Error("Error", message);
					}
					else if (status === 2) {
						NotifyCall.Warn(message);
					}
					else if (status === 3) {
						NotifyCall.Info(message);
					}
					resolve(response);
				})
				.catch(({ response: { data } }) => {
					if (data.status) {
						if (data.message === "Token expired" || data.message === "Token missing") {
							NotifyCall.Info("Token expirado");
							store.finishSession();
						} else {
							NotifyCall.Error("Ocurrió un error", data.message);
						}
					} else {
						NotifyCall.Error("Error", data.message);
					}
					reject();
				});
		});
	}
}
export default AxiosCall;