import React, { FC } from 'react';
import { Container, Toolbar } from '@mui/material';
import { routes } from '@src/routes';
import { Route, Routes } from 'react-router-dom';

interface AppBodyStateProps {}
interface AppBodyDispatchProps {}

type AppBodyProps = AppBodyStateProps & AppBodyDispatchProps;

const AppBody: FC<AppBodyProps> = () => {
	return (
		<Container fixed component="main" sx={{ p: 3 }}>
			<Toolbar />
			<Container
				disableGutters
				maxWidth={'xl'}
				sx={{ paddingTop: 2, flexGrow: 1 }}>
				<Routes>
					{routes.map((route, index) => {
						const Element = route.element;

						if (route.children) {
							return (
								<Route
									path={route.path}
									key={`${route.name}-${index}`}
									element={<Element />}>
									{route.children.map((nestedRoute, i) => {
										const NestedElement = nestedRoute.element;
										return (
											<Route
												path={nestedRoute.path}
												key={`${nestedRoute.name}-${i}`}
												element={<NestedElement />}
											/>
										);
									})}
								</Route>
							);
						}

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
		</Container>
	);
};

export default AppBody;
