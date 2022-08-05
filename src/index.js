import { saludar } from './js/componentes';
import html from "./index.html";
import './styles.css';
import logoWebpack from '../src/assets/img/webpack-logo.png';

const minombre = "yosder";
saludar(minombre);

const img = document.createElement('IMG');
img.src= logoWebpack;
document.body.append(img);