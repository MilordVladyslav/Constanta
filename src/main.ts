import { createApp } from 'vue';

import App from './App.vue';

import './styles/index.scss';

import 'normalize.css/normalize.css';
import constanta from '../lib/constanta.ts';

const app = createApp(App);

app.use(constanta, { preffix: 'const' });

app.mount('body');
