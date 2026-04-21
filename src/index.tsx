import React from 'react';
import ReactDOMClient from 'react-dom/client';
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
                    colorBgLayout: '#ffffff',
                    // colorLink: '#000000',
                },
            }}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);

