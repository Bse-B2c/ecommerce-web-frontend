import React, { FC, useState } from 'react';
import { Grid, IconButton, Pagination, Typography } from '@mui/material';
import Address from '@components/Address';
import { useGetMeAddressQuery } from '@store/api/accountApi';
import { Addresses as AddressType } from '@features/authentication';
import ModalAddress from '@features/myData/components/Modal/ModalAddress';
import { Add } from '@mui/icons-material';

interface AddressesStateProps {
	userId: number;
}
interface AddressesDispatchProps {}

type AddressesProps = AddressesStateProps & AddressesDispatchProps;

const Addresses: FC<AddressesProps> = ({ userId }) => {
	const [page, setPage] = useState(1);
	const [modal, setModal] = useState<{
		isOpen: boolean;
		isEdit: boolean;
		data?: AddressType;
	}>({ isOpen: false, isEdit: false, data: undefined });
	const { data } = useGetMeAddressQuery({
		orderBy: 'active',
		sortOrder: 'DESC',
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

	const onOpenCreateModal = () =>
		setModal({
			isOpen: true,
			isEdit: false,
			data: undefined,
		});

	return (
		<Grid container direction={'column'} spacing={1}>
			<Grid item xs>
				<Grid container justifyContent={'space-between'}>
					<Typography variant={'body1'}>
						<strong>Addresses</strong>
					</Typography>
					<IconButton
						size={'small'}
						onClick={() => {
							onOpenCreateModal();
						}}>
						<Add />
					</IconButton>
				</Grid>
			</Grid>
			<Grid item container direction={'column'} spacing={2} xs>
				<ModalAddress
					userId={userId}
					isOpen={modal.isOpen}
					isEdit={modal.isEdit}
					onClose={onClose}
					address={modal.data}
				/>
				{Array.isArray(data) && data.length > 0
					? data.map(address => {
							return (
								<Grid item xs key={`${address.streetName}`}>
									<Address
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
								</Grid>
							);
					  })
					: null}
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
		</Grid>
	);
};

export default Addresses;
