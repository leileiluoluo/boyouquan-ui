import React from 'react';
import ReactDOMClient from 'react-dom/client';
// import { Theme } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';
import './styles.css';

import { ConfigProvider } from 'antd';

import App from './App.tsx';

const rootElement = document.getElementById('top');
if (!rootElement) {
    throw new Error('Root element not found');
}

ReactDOMClient.createRoot(rootElement).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#D9304E',
                    colorBgLayout: '#fcfcfc',
                    colorTextSecondary: '#D9304E',
                    colorTextQuaternary: '#2e2e2e',
                    colorTextPlaceholder: '#979494',
                    colorLink: '#262525',
                    colorLinkHover: '#d3062c',
                },
            }}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);

