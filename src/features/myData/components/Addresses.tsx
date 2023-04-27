import React, { FC, useState } from 'react';
import { Grid, Pagination } from '@mui/material';
import Address from '@components/Address';
import { useGetMeAddressQuery } from '@store/api/accountApi';
import { Addresses as AddressType } from '@features/authentication';
import ModalAddress from '@features/myData/components/Modal/ModalAddress';

interface AddressesStateProps {}
interface AddressesDispatchProps {}

type AddressesProps = AddressesStateProps & AddressesDispatchProps;

const Addresses: FC<AddressesProps> = () => {
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState<{
		isOpen: boolean;
		isEdit: boolean;
		data?: AddressType;
	}>({ isOpen: false, isEdit: false, data: undefined });
	const { data } = useGetMeAddressQuery({
		orderBy: 'active',
		sortOrder: 'ASC',
		limit: 2,
		page: page - 1,
	});

	const onChange = (e: unknown, newPage: number) => setPage(newPage);

	const onClose = () => {
		setModal(prevState => ({
			...prevState,
			isOpen: false,
			isEdit: false,
			data: undefined,
		}));
	};

	const onOpenEditModal = (data: AddressType) =>
		setModal({ isOpen: true, isEdit: true, data });

	return (
		<Grid item container direction={'column'} spacing={2} xs>
			<ModalAddress
				isOpen={modal.isOpen}
				isEdit={modal.isEdit}
				onClose={onClose}
				address={modal.data}
			/>
			<Grid item>
				{Array.isArray(data) && data.length > 0
					? data.map(address => {
							return (
								<Address
									key={`${address.streetName}`}
									id={address.id}
									isPinned={address.active}
									streetName={address.streetName}
									houseNumber={address.houseNumber}
									apartment={address.apartment}
									zipCode={address.zipCode}
									city={address.city}
									country={address.country}
									onEdit={() => {
										onOpenEditModal(address);
									}}
									onDelete={() => {}}
								/>
							);
					  })
					: null}
			</Grid>
			<Grid container item xs alignItems="center" justifyContent="center">
				<Pagination
					size="small"
					count={50}
					page={page}
					onChange={onChange}
					color="primary"
				/>
			</Grid>
		</Grid>
	);
};

export default Addresses;
