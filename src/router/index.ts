import { createRouter, createWebHistory } from 'vue-router'

// views
import HomeView from '../views/home-view.vue'

const router = createRouter( {

	history : createWebHistory( import.meta.env.BASE_URL ),

	routes : [

		{
			path : '/',
			name : 'home',
			component : HomeView
		}

	]

} )

export default router
