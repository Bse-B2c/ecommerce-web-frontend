import React, { FC, useEffect } from 'react';
import { Modal } from '@components/modal';
import { Button, FormControl, Grid } from '@mui/material';
import { Close, Save } from '@mui/icons-material';
import CustomerForm from '@features/myData/components/Modal/customer/CustomerForm';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object } from 'yup';
import { baseCustomerFormDto } from '@components/customerForm/CustomerFormDto';
import dayjs from 'dayjs';

interface ModalCustomerStateProps {
	isOpen: boolean;
	data: any;
}
interface ModalCustomerDispatchProps {
	onClose: () => void;
}

type ModalCustomerProps = ModalCustomerStateProps & ModalCustomerDispatchProps;

const ModalCustomer: FC<ModalCustomerProps> = ({ isOpen, onClose, data }) => {
	const {
		control,
		register,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(object().shape(baseCustomerFormDto)),
		criteriaMode: 'all',
		mode: 'all',
		defaultValues: {
			name: '',
			email: '',
			cpf: '',
			phone: '',
			brithDate: null,
		},
	});

	useEffect(() => {
		setValue('name', data?.name || '');
		setValue('email', data?.email || '');
		setValue('cpf', data?.cpf || '');
		setValue('phone', data?.phone || '');
		setValue(
			'brithDate',
			data?.brithDate ? dayjs(data?.brithDate) : (null as any)
		);
	}, [data]);

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				onClose();
			}}
			buttonClose>
			<Modal.Header>{'Edit'}</Modal.Header>
			<FormControl
				component="form"
				onSubmit={handleSubmit(data => console.log(data))}>
				<Modal.Content>
					<CustomerForm
						watch={watch}
						register={register}
						errors={errors}
						control={control}
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

export default ModalCustomer;
