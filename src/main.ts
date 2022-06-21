import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar } from 'quasar'
import quasarLang from 'quasar/lang/ru'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

import App from './app.vue'
import router from './router'

const app = createApp( App )

app.use( Quasar, {
	plugins : {},
	lang : quasarLang
} )
app.use( createPinia() )
app.use( router )

app.mount( '#app' )
