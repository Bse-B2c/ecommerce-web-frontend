import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@src/store';
import { Provider } from 'react-redux';

const Notification = lazy(() => import('@components/Notification'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<Notification />
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
