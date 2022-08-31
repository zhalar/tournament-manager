import { createWebHistory, createRouter } from "vue-router";

const routes = [
    {
		path: "/",
		redirect: {
			name: "main"
		}
	},
    {
		path: `/main`,
		name: "main",
		component: () => import("@/views/main.vue"),
		children: [
			{
				path: `tournament`,
				name: "tournament",
				component: () => import("@/views/tournament.vue"),
			}
		]
	},
	{
		path: `/login`,
		name: "login",
		component: () => import("@/views/login.vue")
	},
]
  
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
  