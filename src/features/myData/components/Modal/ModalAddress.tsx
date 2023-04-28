import React, { FC, useEffect } from 'react';
import { Modal } from '@components/modal';
import { Button, FormControl, Grid } from '@mui/material';
import { Addresses } from '@features/authentication';
import { Close, Save } from '@mui/icons-material';
import AddressForm from '@features/myData/components/Modal/AddressForm';
import { useLazyGetZipCodeQuery } from '@store/api/zipCodeApi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddressFormDto } from '@features/myData/components/Modal/AddressFormDto';
import {
	useCreateAddressMutation,
	useEditAddressMutation,
} from '@store/api/accountApi';
import { showNotification } from '@store/notification/notificationSlice';
import { useDispatch } from 'react-redux';
import { ApiResponse } from '@src/model/ApiResponse';

interface ModalAddressStateProps {
	userId: number;
	isOpen: boolean;
	isEdit: boolean;
	address?: Addresses;
}
interface ModalAddressDispatchProps {
	onClose: () => void;
}

type ModalAddressProps = ModalAddressStateProps & ModalAddressDispatchProps;

const ModalAddress: FC<ModalAddressProps> = ({
	userId,
	isOpen,
	isEdit,
	address,
	onClose,
}) => {
	const [onEditAddress] = useEditAddressMutation();
	const [onCreateAddress] = useCreateAddressMutation();
	const [getZipCode] = useLazyGetZipCodeQuery();
	const dispatch = useDispatch();
	const {
		register,
		setValue,
		watch,
		setFocus,
		handleSubmit,
		clearErrors,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(AddressFormDto),
		criteriaMode: 'all',
		mode: 'all',
	});
	useEffect(() => {
		setValue('zipCode', isEdit ? address?.zipCode : '');
		setValue('streetName', isEdit ? address?.streetName : '');
		setValue('city', isEdit ? address?.city : '');
		setValue('country', isEdit ? address?.country : '');
		setValue('district', isEdit ? address?.region : '');
		setValue('houseNumber', isEdit ? address?.houseNumber : '');
		setValue('apartment', isEdit ? address?.apartment : '');
	}, [isEdit, address]);

	const onCheckZipCode = async (e: any) => {
		try {
			const value = e.target.value;
			if (value && value !== '') {
				const zipCode = await getZipCode(value).unwrap();

				setValue('streetName', zipCode.logradouro);
				setValue('city', zipCode.localidade);
				setValue('country', 'Brasil');
				setValue('district', zipCode.bairro);
				setFocus('houseNumber');
			}
		} catch (e) {}
	};

	const onSubmit = async (data: any) => {
		try {
			if (isEdit) {
				await onEditAddress({
					id: address?.id || -1,
					...data,
					houseNumber: +data.houseNumber,
					active: address?.active || false,
					region: data.district,
				}).unwrap();

				dispatch(
					showNotification({
						type: 'success',
						message: 'Address successfully edited',
					})
				);
			} else {
				await onCreateAddress({
					...data,
					userId,
					houseNumber: +data.houseNumber,
					region: data.district,
				}).unwrap();

				dispatch(
					showNotification({
						type: 'success',
						message: 'Address created successfully',
					})
				);
			}

			reset();
			clearErrors();
			onClose();
		} catch (e) {
			const error = e as { data: ApiResponse<null> };
			const message = error?.data?.error
				? error.data.error.message
				: 'Something went wrong';

			dispatch(showNotification({ type: 'error', message }));
		}
	};

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				reset();
				clearErrors();
				onClose();
			}}
			buttonClose>
			<Modal.Header>{isEdit ? 'Edit Address' : 'Add Address'}</Modal.Header>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
				<Modal.Content>
					<AddressForm
						watch={watch}
						register={register}
						errors={errors}
						onCheckZipCode={onCheckZipCode}
					/>
				</Modal.Content>
				<Modal.Footer>
					<Grid container item xs justifyContent="end">
						<Button
							size="small"
							variant="contained"
							disableElevation
							startIcon={<Close />}
							sx={{ mr: 1 }}
							onClick={() => {
								reset();
								clearErrors();
								onClose();
							}}>
							Close
						</Button>
						<Button
							size="small"
							variant="contained"
							type={'submit'}
							color="success"
							disableElevation
							startIcon={<Save />}>
							Save
						</Button>
					</Grid>
				</Modal.Footer>
			</FormControl>
		</Modal>
	);
};

export default ModalAddress;
