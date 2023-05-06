import React, { FC } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Login } from '@mui/icons-material';

interface UnauthorizedStateProps {}
interface UnauthorizedDispatchProps {}

type UnauthorizedProps = UnauthorizedStateProps & UnauthorizedDispatchProps;

const Unauthorized: FC<UnauthorizedProps> = () => {
	return (
		<Grid
			container
			item
			xs
			direction={'column'}
			alignItems={'center'}
			justifyContent={'center'}>
			<Typography variant="h1" color={'info.main'}>
				401
			</Typography>
			<Typography variant="h5" color={'info.main'}>
				No Authorization Found.
			</Typography>
			<Typography variant="body1">To access it, please login first.</Typography>
			<Button
				sx={{ mt: 4 }}
				startIcon={<Login />}
				href="/login"
				variant="contained"
				size={'small'}
				disableElevation>
				Sign In or Sign Up
			</Button>
		</Grid>
	);
};

export default Unauthorized;
