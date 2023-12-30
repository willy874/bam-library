import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './reset.scss';

createRoot(document.getElementById('root') as Element).render(createElement(App));
