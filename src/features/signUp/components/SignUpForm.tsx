import React, { FC } from 'react';
import CustomerForm from '@components/customerForm/CustomerForm';
import { useCreateCustomerMutation } from '@store/api/accountApi';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@store/notification/notificationSlice';
import { useDispatch } from 'react-redux';
import { ApiResponse } from '@src/model/ApiResponse';
import { useCreateShoppingCartMutation } from '@store/api/orderApi';
import { User } from '@features/authentication';

interface SignUpFormStateProps {}
interface SignUpFormDispatchProps {}

type SignUpFormProps = SignUpFormStateProps & SignUpFormDispatchProps;

const SignUpForm: FC<SignUpFormProps> = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [createUser, { isLoading }] = useCreateCustomerMutation();
	const [createUserShoppingCart] = useCreateShoppingCartMutation();

	const onSubmit = async (data: any) => {
		try {
			const response = await createUser({
				name: data.name,
				brithDate: data.brithDate.toISOString(),
				phone: data.phone,
				email: data.email,
				password: data.password,
				cpf: data.cpf,
			});

			const {
				data: { id },
			} = response as { data: User };

			if (id) {
				try {
					await createUserShoppingCart(id);
				} catch (e) {}
			}

			dispatch(
				showNotification({
					type: 'success',
					message: 'Account created successfully',
				})
			);

			navigate('/login');
		} catch (e) {
			const error = e as { data: ApiResponse<null> };
			const message = error?.data?.error
				? error.data.error.message
				: 'Something went wrong';

			dispatch(showNotification({ type: 'error', message }));
		}
	};

	return (
		<CustomerForm
			isLoading={isLoading}
			defaultValues={{
				name: '',
				email: '',
				phone: '',
				cpf: '',
				password: '',
				confirmPassword: '',
				brithDate: null,
			}}
			onSubmit={onSubmit}
		/>
	);
};

export default SignUpForm;
