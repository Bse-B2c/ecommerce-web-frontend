import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { SignUpForm } from '@features/signUp';

interface SignUpStateProps {}
interface SignUpDispatchProps {}

type SignUpProps = SignUpStateProps & SignUpDispatchProps;

const SignUp: FC<SignUpProps> = () => {
	return (
		<Grid
			container
			justifyContent={'center'}
			height={'80vh'}
			alignItems={'start'}>
			<Grid container item spacing={5} direction={'column'} maxWidth={600}>
				<Grid item xs textAlign={'center'}>
					<Typography variant={'h6'}>Sign Up</Typography>
				</Grid>
				<SignUpForm />
			</Grid>
		</Grid>
	);
};

export default SignUp;
