/** 主入口js */
import {createApp} from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './config/axios-config';
import setting from './config/setting';
import permission from './utils/permission';
import './styles/index.less';
//import DesignForm from 'vue-form-create'
import EleAdminPro from 'ele-admin-pro';
import ModalUtil from 'ele-admin-pro/packages/modal-util';
import i18n from './lang';

//import 'ant-design-vue/dist/antd.css'

const app = createApp(App);
app.config.productionTip = false;
app.use(store);
app.use(router);
app.use(VueAxios, axios);
app.use(permission);
//app.use(DesignForm);
app.use(EleAdminPro);
app.use(ModalUtil);
app.use(i18n);

app.config.globalProperties.$setting = setting;
app.mount('#app');
