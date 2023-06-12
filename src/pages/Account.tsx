import React, { FC } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { AccountTabs, UserAvatar } from '@features/account';
import { User } from '@features/authentication';

interface AccountStateProps {}
interface AccountDispatchProps {}

type AccountProps = AccountStateProps & AccountDispatchProps;

const Account: FC<AccountProps> = () => {
	const { user } = useOutletContext<{ user: User }>();

	return (
		<Grid container item xs spacing={2} direction={'column'}>
			<Grid item xs>
				<Button
					color={'secondary'}
					size={'small'}
					startIcon={<ArrowBack />}
					href={'/'}>
					Back
				</Button>
			</Grid>
			<UserAvatar name={user?.name || ''} email={user?.email || ''} />
			<AccountTabs />
			<Grid item xs>
				<Outlet context={{ user }} />
			</Grid>
		</Grid>
	);
};

export default Account;
