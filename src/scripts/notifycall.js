import { useGeneralStore } from "@/stores/general";
import { SEVERITY_TYPE } from "@/scripts/constant";

class NotifyCall {
	constructor() { }

	static Info(title = "", message = "") {
		const store = useGeneralStore();
		store.toast.add({
			severity: SEVERITY_TYPE.INFO,
			summary: title,
			detail: message,
			life: 3000,
		});
	}

	static Success(title = "", message = "") {
		const store = useGeneralStore();
		store.toast.add({
			severity: SEVERITY_TYPE.SUCCESS,
			summary: title,
			detail: message,
			life: 3000,
		});
	}

	static Warn(title = "", message = "") {
		const store = useGeneralStore();
		store.toast.add({
			severity: SEVERITY_TYPE.WARN,
			summary: title,
			detail: message,
			life: 3000,
		});
	}

	static Error(title = "", message = "") {
		const store = useGeneralStore();
		store.toast?.add({
			severity: SEVERITY_TYPE.ERROR,
			summary: title,
			detail: message,
			life: 3000,
		});
	}
}

export default NotifyCall;