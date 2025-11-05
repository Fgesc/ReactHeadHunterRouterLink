import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { createTheme, MantineProvider } from '@mantine/core';
import App from './components/App/App';
import { store } from './store/store';
import '@mantine/core/styles.css';
import './index.css';

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    headings: { fontFamily: 'Open Sans, sans-serif' },
    colors: {
        'indigo': [
            '#EDF2FF',
            '#DBE4FF',
            '#BAC8FF',
            '#91A7FF',
            '#748FFC',
            '#5C7CFA',
            '#4C6EF5',
            '#4263EB',
            '#3B5BDB',
            '#364FC7',
        ]
    },
    primaryColor: 'indigo',

    other: {
        colors: {
            black1: 'rgba(15, 15, 16, 1)',       
            gray: 'rgba(15, 15, 16, 0.5)',       
            lightGray: 'rgba(15, 15, 16, 0.3)',  
            preLight: 'rgba(15, 15, 16, 0.2)',   
            ultraLight: 'rgba(15, 15, 16, 0.1)', 
            background: 'rgba(246, 246, 247, 1)', 
            white: 'rgba(255, 255, 255, 1)',     
        },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
            <Provider store={store}>
                <MantineProvider theme={theme}>
                    <App />
                </MantineProvider>
            </Provider>
    </StrictMode>
);
