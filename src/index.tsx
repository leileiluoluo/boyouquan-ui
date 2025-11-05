import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './styles.css';

import App from './App';

const rootElement = document.getElementById('top');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOMClient.createRoot(rootElement).render(
    <React.StrictMode>
        <Theme>
            <App />
        </Theme>
    </React.StrictMode>
);

