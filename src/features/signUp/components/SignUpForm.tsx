import React, { FC } from 'react';
import CustomerForm from '@components/customerForm/CustomerForm';

interface SignUpFormStateProps {}
interface SignUpFormDispatchProps {}

type SignUpFormProps = SignUpFormStateProps & SignUpFormDispatchProps;

const SignUpForm: FC<SignUpFormProps> = () => {
	return (
		<CustomerForm
			defaultValues={{
				name: '',
				email: '',
				phone: '',
				cpf: '',
				password: '',
				confirmPassword: '',
				brithDate: null,
			}}
			onSubmit={() => {}}
		/>
	);
};

export default SignUpForm;
