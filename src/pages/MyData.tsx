import React, { FC } from 'react';
import { useOutletContext } from 'react-router-dom';
import { User } from '@features/authentication';
import { Card, CardContent, Grid } from '@mui/material';
import { Addresses, Customer } from '@features/myData';

interface MyDataStateProps {}
interface MyDataDispatchProps {}

type MyDataProps = MyDataStateProps & MyDataDispatchProps;

const MyData: FC<MyDataProps> = () => {
	const { user } = useOutletContext<{ user?: User }>();
	return (
		<Grid container item xs spacing={2}>
			<Grid item xs={5} md={4}>
				<Customer user={user} />
			</Grid>
			<Grid item xs={7} md={8}>
				<Card variant={'outlined'}>
					<CardContent>
						<Addresses userId={user?.id || -1} />
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default MyData;
