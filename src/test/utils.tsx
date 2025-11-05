import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import { MemoryRouter } from 'react-router-dom'; 
import { setupStore } from '../store/store';

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    headings: { fontFamily: 'Open Sans, sans-serif' },
    colors: {
        indigo: [
        '#EDF2FF', '#DBE4FF', '#BAC8FF', '#91A7FF', '#748FFC',
        '#5C7CFA', '#4C6EF5', '#4263EB', '#3B5BDB', '#364FC7',
        ],
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

export function customRender(ui: React.ReactElement, { store, route = '/', ...options } = {} as any) {
    const usedStore = store ?? setupStore();
    window.history.pushState({}, 'Test page', route);

    const AllProviders = ({ children }: { children: React.ReactNode }) => (
        <MemoryRouter initialEntries={[route]}>
            <Provider store={usedStore}>
                <MantineProvider theme={theme}>{children}</MantineProvider>
            </Provider>
        </MemoryRouter>
    );

    return { store: usedStore, ...render(ui, { wrapper: AllProviders, ...options }) };
}


