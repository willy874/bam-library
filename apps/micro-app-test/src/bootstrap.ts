import { createElement } from 'react';
import { Root, createRoot } from 'react-dom/client';
import { add } from 'lodash';
import App from './App';
import './reset.scss';

console.log(add);

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

// eslint-disable-next-line no-undef
window.__webpack_require__ = __webpack_require__;
// eslint-disable-next-line no-undef
window.__webpack_share_scopes__ = __webpack_share_scopes__;
// eslint-disable-next-line no-undef
__webpack_init_sharing__('default');

export { ReactApp };
