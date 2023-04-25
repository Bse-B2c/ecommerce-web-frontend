import React, { FC } from 'react';
import { Avatar, Grid, Box, Typography } from '@mui/material';

interface UserAvatarStateProps {
	name: string;
	email: string;
}
interface UserAvatarDispatchProps {}

type UserAvatarProps = UserAvatarStateProps & UserAvatarDispatchProps;

const UserAvatar: FC<UserAvatarProps> = ({ name, email }) => {
	const initialLetter = name ? name.charAt(0) : '';

	return (
		<Grid container item xs alignItems="center">
			<Avatar>{initialLetter}</Avatar>
			<Box sx={{ ml: 2 }}>
				<Typography variant={'h6'}>{name}</Typography>
				<Typography variant={'subtitle2'} color={'text.secondary'}>
					{email}
				</Typography>
			</Box>
		</Grid>
	);
};

export default UserAvatar;
