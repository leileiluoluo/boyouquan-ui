import React from 'react';
import ReactDOMClient from 'react-dom/client';
// import { Theme } from '@radix-ui/themes';
// import '@radix-ui/themes/styles.css';
// import './styles.css';

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
                    colorBgLayout: '#092640',
                    colorTextQuaternary: 'rgba(255,255,255,0.65)',
                }
            }}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);

