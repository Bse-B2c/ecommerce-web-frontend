import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@src/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>
);
