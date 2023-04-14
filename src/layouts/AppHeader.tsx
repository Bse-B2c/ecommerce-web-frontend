import React, { FC } from 'react';
import {
	AppBar,
	Badge,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import SearchInput from '@components/searchInput/SearchInput';

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
				<div>
					<IconButton
						size="large"
						aria-label="account of current user"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						color="inherit">
						<AccountCircle />
					</IconButton>
					<Menu
						id="menu-appbar"
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={false}>
						<MenuItem>Profile</MenuItem>
						<MenuItem>My account</MenuItem>
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default AppHeader;
