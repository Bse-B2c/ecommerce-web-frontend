import React, { FC } from 'react';
import {
	AppBar,
	Badge,
	Box,
	IconButton,
	Toolbar,
	Typography,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import SearchInput from '@components/searchInput/SearchInput';
import UserMenu from '@components/userMenu/userMenu';

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
				</Box>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
