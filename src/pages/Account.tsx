import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Button, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useAuthUser } from '@hooks/useAuthUser';
import { AccountTabs, UserAvatar } from '@features/account';

interface AccountStateProps {}
interface AccountDispatchProps {}

type AccountProps = AccountStateProps & AccountDispatchProps;

const Account: FC<AccountProps> = () => {
	const user = useAuthUser();

	return (
		<Grid container item xs spacing={2} direction={'column'}>
			<Grid item xs>
				<Button
					color={'secondary'}
					size={'small'}
					startIcon={<ArrowBack />}
					href={'/home'}>
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
