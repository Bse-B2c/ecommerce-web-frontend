import React, { FC, useState } from 'react';
import CustomerInfo from '@features/myData/components/CustomerInfo';
import { User } from '@features/authentication';
import ModalCustomer from '@features/myData/components/Modal/customer/ModalCustomer';

interface CustomerStateProps {
	user?: User;
}
interface CustomerDispatchProps {}

type CustomerProps = CustomerStateProps & CustomerDispatchProps;

const Customer: FC<CustomerProps> = ({ user }) => {
	const [modal, setModal] = useState<{
		isOpen: boolean;
		data?: any;
	}>({ isOpen: false, data: undefined });

	const onClose = () => {
		setModal(prevState => ({
			...prevState,
			isOpen: false,
			data: undefined,
		}));
	};

	const onOpen = (data: any) => {
		setModal(prevState => ({
			...prevState,
			isOpen: true,
			data,
		}));
	};
	return (
		<>
			<ModalCustomer
				isOpen={modal.isOpen}
				data={modal.data}
				onClose={onClose}
			/>
			<CustomerInfo
				id={user?.id || -1}
				name={user?.name || ''}
				email={user?.email || ''}
				phone={user?.phone || ''}
				cpf={user?.cpf || ''}
				brithDate={user?.brithDate || ''}
				onEdit={() => onOpen(user)}
			/>
		</>
	);
};

export default Customer;
