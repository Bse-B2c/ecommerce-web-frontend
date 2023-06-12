import React, { FC, useState } from 'react';
import { Box, Button, Grid, Icon, Typography } from '@mui/material';
import { Home, ChangeCircle, Add } from '@mui/icons-material';
import Address from '@components/Address';
import ModalAddress from '@features/shopCart/components/ModalAddress';
import ModalFormAddress from '@features/myData/components/Modal/ModalAddress';
import { Addresses } from '@features/authentication';

interface ShoppingCartAddressStateProps {
	address: Addresses | null;
	addresses: Array<Addresses>;
	userId?: number;
}
interface ShoppingCartAddressDispatchProps {
	onChangeAddress: (item: Addresses) => void;
}

type ShoppingCartAddressProps = ShoppingCartAddressStateProps &
	ShoppingCartAddressDispatchProps;

const ShoppingCartAddress: FC<ShoppingCartAddressProps> = ({
	address,
	addresses,
	userId,
	onChangeAddress,
}) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isOpenForm, setOpenForm] = useState<boolean>(false);

	return (
		<Grid item xs>
			<ModalAddress
				idSelected={address?.id || -1}
				isOpen={isOpen}
				onClose={() => setOpen(false)}
				addresses={addresses}
				onChangeAddress={onChangeAddress}
			/>
			<ModalFormAddress
				userId={userId || -1}
				isOpen={isOpenForm}
				isEdit={false}
				onClose={() => setOpenForm(false)}
			/>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 2,
				}}>
				<Typography variant="h6">
					<Icon sx={{ mr: 1 }}>
						<Home />
					</Icon>
					Shipping Address
				</Typography>
				{address ? (
					<Button
						size="small"
						variant="outlined"
						startIcon={<ChangeCircle />}
						onClick={() => setOpen(prevState => !prevState)}>
						Change Address
					</Button>
				) : (
					<Button
						size="small"
						variant="outlined"
						startIcon={<Add />}
						onClick={() => setOpenForm(prevState => !prevState)}>
						Add Address
					</Button>
				)}
			</Box>
			{address && (
				<Address
					id={address.id}
					streetName={address.streetName}
					city={address.city}
					country={address.country}
					apartment={address.apartment}
					houseNumber={address.houseNumber}
					zipCode={address.zipCode}
					region={address.region}
				/>
			)}
		</Grid>
	);
};

export default ShoppingCartAddress;
