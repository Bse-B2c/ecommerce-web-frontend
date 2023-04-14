import React, { FC } from 'react';
import { Box, Container, Toolbar } from '@mui/material';
import { routes } from '@src/routes';
import { Route, Routes } from 'react-router-dom';

interface AppBodyStateProps {}
interface AppBodyDispatchProps {}

type AppBodyProps = AppBodyStateProps & AppBodyDispatchProps;

const AppBody: FC<AppBodyProps> = () => {
	return (
		<Box component="main" sx={{ p: 3 }}>
			<Toolbar />
			<Container
				disableGutters
				maxWidth={'xl'}
				sx={{ paddingTop: 2, flexGrow: 1 }}>
				<Routes>
					{routes.map((route, index) => {
						const Element = route.element;

						return (
							<Route
								path={route.path}
								key={`${route.name}-${index}`}
								element={<Element />}
							/>
						);
					})}
				</Routes>
			</Container>
		</Box>
	);
};

export default AppBody;
