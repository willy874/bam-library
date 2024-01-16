import { createElement } from 'react';
import { Root, createRoot } from 'react-dom/client';
import App from './App';
import './reset.scss';

class ReactApp extends HTMLElement {
  root: ShadowRoot;
  reactRoot: Root;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.reactRoot = createRoot(this.root);
  }

  connectedCallback() {
    this.reactRoot.render(createElement(App));
  }

  disconnectedCallback() {
    this.reactRoot.unmount();
  }
}

customElements.define('react-template', ReactApp);
