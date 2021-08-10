import { App } from './components/app/app';
import './styles.scss';

window.onload = () => {
  const rootElement = document.querySelector('body');
  if (rootElement) {
    rootElement.appendChild(new App().element);
  }
};
