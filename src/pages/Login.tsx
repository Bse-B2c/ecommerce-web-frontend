import React, { FC } from 'react';
import LoginForm from '@features/authentication/components/LoginForm';
import { Grid, Typography } from '@mui/material';

interface LoginStateProps {}
interface LoginDispatchProps {}

type LoginProps = LoginStateProps & LoginDispatchProps;

const Login: FC<LoginProps> = () => {
	return (
		<Grid
			container
			justifyContent={'center'}
			height={'80vh'}
			alignItems={'start'}>
			<Grid
				container
				item
				spacing={5}
				width={'50%'}
				direction={'column'}
				alignItems={'center'}>
				<Grid item xs>
					<Typography variant={'h6'}>Login</Typography>
				</Grid>
				<LoginForm />
			</Grid>
		</Grid>
	);
};

export default Login;
