import React, { FC } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import SearchInput from '@components/searchInput/SearchInput';
import UserMenu from '@components/userMenu/userMenu';
import ShoppingCartButton from '@components/ShoppingCartButton';

interface AppHeaderStateProps {}
interface AppHeaderDispatchProps {}

type AppHeaderProps = AppHeaderStateProps & AppHeaderDispatchProps;

const AppHeader: FC<AppHeaderProps> = () => {
	return (
		<AppBar position="fixed" component="nav">
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<Box>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						E-commerce
					</Typography>
				</Box>
				<Box sx={{ width: '35%' }}>
					<SearchInput />
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<ShoppingCartButton />
					<UserMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
