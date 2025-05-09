import ReactDOMClient from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import App from './App';

ReactDOMClient.createRoot(document.getElementById('top')).render(
    <React.StrictMode>
        <Theme>
            <App />
        </Theme>
    </React.StrictMode>
);