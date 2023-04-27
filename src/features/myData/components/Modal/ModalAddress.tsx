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

interface ModalAddressStateProps {
	isOpen: boolean;
	isEdit: boolean;
	address?: Addresses;
}
interface ModalAddressDispatchProps {
	onToggle: () => void;
}

type ModalAddressProps = ModalAddressStateProps & ModalAddressDispatchProps;

const ModalAddress: FC<ModalAddressProps> = ({
	isOpen,
	isEdit,
	address,
	onToggle,
}) => {
	const [getZipCode] = useLazyGetZipCodeQuery();
	const {
		register,
		setValue,
		watch,
		setFocus,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(AddressFormDto),
		criteriaMode: 'all',
		mode: 'all',
	});
	useEffect(() => {
		if (isEdit) {
			setValue('zipCode', address?.zipCode || '');
			setValue('streetName', address?.streetName || '');
			setValue('city', address?.city || '');
			setValue('country', address?.country || '');
			setValue('district', address?.region || '');
			setValue('houseNumber', address?.houseNumber || '');
			setValue('apartment', address?.apartment || '');
		}
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
	return (
		<Modal open={isOpen} onClose={onToggle} buttonClose>
			<Modal.Header>{isEdit ? 'Edit Address' : 'Add Address'}</Modal.Header>
			<FormControl
				component="form"
				onSubmit={handleSubmit(data => console.log(data))}>
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
							onClick={onToggle}>
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
