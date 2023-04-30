import React, { FC } from 'react';
import { Box, CssBaseline } from '@mui/material';
import AppHeader from '@layouts/AppHeader';
import AppBody from '@layouts/AppBody';
import AppFooter from '@layouts/AppFooter';

interface AppLayoutStateProps {}
interface AppLayoutDispatchProps {}

type AppLayoutProps = AppLayoutStateProps & AppLayoutDispatchProps;

const AppLayout: FC<AppLayoutProps> = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<CssBaseline />
			<AppHeader />
			<AppBody />
			<AppFooter />
		</Box>
	);
};

export default AppLayout;
