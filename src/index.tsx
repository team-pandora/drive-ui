import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './i18n';
import store from './store';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// TODO:
// document.body.style.height = '100%';
document.body.style.overflowY = 'hidden';

root.render(
    <Suspense>
        <BrowserRouter>
            <Provider store={store}>
                <StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <ReactQueryDevtools />
                    </QueryClientProvider>
                </StrictMode>
            </Provider>
        </BrowserRouter>
    </Suspense>,
);
