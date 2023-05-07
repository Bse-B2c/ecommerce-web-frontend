import React, { FC, useState, useEffect } from 'react';
import {
	Button,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	Link,
	Box,
} from '@mui/material';
import {
	AccountCircle,
	Person,
	ShoppingBasket,
	Logout,
} from '@mui/icons-material';
import {
	getRefreshToken,
	getToken,
	removeTokens,
} from '@features/authentication';
import { useLazyGetMeQuery } from '@store/api/accountApi';
import { useAuthUser } from '@hooks/useAuthUser';
import { Link as RouterLink } from 'react-router-dom';

interface UserMenuStateProps {}
interface UserMenuDispatchProps {}

type UserMenuProps = UserMenuStateProps & UserMenuDispatchProps;

const UserMenu: FC<UserMenuProps> = () => {
	const [getMe] = useLazyGetMeQuery();
	const { user } = useAuthUser();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	useEffect(() => {
		const token = getToken();
		const refreshToken = getRefreshToken();

		if (token || refreshToken) {
			getMe();
		}
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (user && user.id)
		return (
			<>
				<IconButton
					size="large"
					aria-controls={open ? 'account-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					color="inherit"
					onClick={handleClick}>
					<AccountCircle />
				</IconButton>
				<Menu
					id="account-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
					<MenuItem component={RouterLink} to="/account/data">
						<ListItemIcon>
							<Person />
						</ListItemIcon>
						My account
					</MenuItem>
					<MenuItem component={RouterLink} to="/account/order">
						<ListItemIcon>
							<ShoppingBasket />
						</ListItemIcon>
						My order history
					</MenuItem>
					<MenuItem
						component={Link}
						href="/"
						onClick={() => {
							removeTokens();
						}}>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</>
		);

	return (
		<Box>
			<Button
				sx={{ mr: 1, ml: 1 }}
				href={'/signup'}
				size={'small'}
				variant={'outlined'}
				color={'inherit'}>
				Sign Up
			</Button>
			<Button
				href={'/login'}
				size={'small'}
				variant={'outlined'}
				color={'inherit'}>
				Sign In
			</Button>
		</Box>
	);
};

export default UserMenu;
