import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AppLayout = lazy(() => import('@layouts/AppLayout'));

function App() {
	return (
		<Routes>
			<Route path={'/*'} element={<AppLayout />} />
		</Routes>
	);
}

export default App;
