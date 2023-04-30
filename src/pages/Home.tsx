import React, { FC } from 'react';
import { Grid } from '@mui/material';
import Offers from '@features/home/components/Offers';

interface HomeStateProps {}
interface HomeDispatchProps {}

type HomeProps = HomeStateProps & HomeDispatchProps;

const Home: FC<HomeProps> = () => {
	return (
		<Grid container item xs spacing={2}>
			<Offers />
		</Grid>
	);
};

export default Home;
