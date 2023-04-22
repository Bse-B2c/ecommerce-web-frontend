import React, { FC } from 'react';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import SearchInput from '@components/searchInput/SearchInput';
import UserMenu from '@components/userMenu/userMenu';

interface AppHeaderStateProps {}
interface AppHeaderDispatchProps {}

type AppHeaderProps = AppHeaderStateProps & AppHeaderDispatchProps;

const AppHeader: FC<AppHeaderProps> = () => {
	return (
		<AppBar position="fixed" component="nav">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					E-commerce
				</Typography>
				<SearchInput />
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="menu-appbar"
					aria-haspopup="true"
					color="inherit">
					<Badge badgeContent={4} color="error">
						<ShoppingCart />
					</Badge>
				</IconButton>
				<UserMenu />
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
