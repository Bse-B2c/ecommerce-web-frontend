import React, { FC, SyntheticEvent, useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import { Person, ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';

interface AccountTabsStateProps {}
interface AccountTabsDispatchProps {}

type AccountTabsProps = AccountTabsStateProps & AccountTabsDispatchProps;

const AccountTabs: FC<AccountTabsProps> = () => {
	const [value, setValue] = useState(0);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Grid item xs>
			<Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
				<Tab
					icon={<Person />}
					iconPosition="start"
					label="My Data"
					component={Link}
					to={'/account/data'}
				/>
				<Tab
					icon={<ShoppingBasket />}
					iconPosition="start"
					label="My Order History"
					component={Link}
					to={'/account/order'}
				/>
			</Tabs>
		</Grid>
	);
};

export default AccountTabs;
