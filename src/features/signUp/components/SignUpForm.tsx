import React, { FC } from 'react';
import CustomerForm from '@components/customerForm/CustomerForm';
import { useCreateCustomerMutation } from '@store/api/accountApi';
import { useNavigate } from 'react-router-dom';

interface SignUpFormStateProps {}
interface SignUpFormDispatchProps {}

type SignUpFormProps = SignUpFormStateProps & SignUpFormDispatchProps;

const SignUpForm: FC<SignUpFormProps> = () => {
	const navigate = useNavigate();
	const [createUser, { isLoading }] = useCreateCustomerMutation();
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
			onSubmit={async data => {
				try {
					await createUser({
						name: data.name,
						brithDate: data.brithDate.toISOString(),
						phone: data.phone,
						email: data.email,
						password: data.password,
						cpf: data.cpf,
					}).unwrap();

					navigate('/login');
				} catch (e) {}
			}}
		/>
	);
};

export default SignUpForm;
