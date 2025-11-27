import { createApp, defineAsyncComponent } from 'vue';
import router from './router.js';
import store from './store/index.js'
import App from './App.vue'
import BaseCard from './components/ui/BaseCard.vue'
import BaseButton from './components/ui/BaseButton.vue'
import BaseBadge from './components/ui/BaseBadge.vue'
import BaseSpinner from './components/ui/BaseSpinner.vue'
import BasePrevious from './components/ui/BasePrevious.vue'
import BasePage from './components/ui/BasePage.vue'
// import BaseDialog from './components/ui/BaseDialog.vue'

// defineAsyncComponent imports only if the component is needed.
const BaseDialog = defineAsyncComponent(()=>import('./components/ui/BaseDialog.vue'))

import { registerFontAwesome } from './plugins/fontawesome'

const app = createApp(App)


app.use(router)
app.use(store)
// REGISTER THE FONT AWESOME COMPONENT
registerFontAwesome(app)

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);
app.component('base-previous', BasePrevious);
app.component('base-page', BasePage);


app.mount('#app');
