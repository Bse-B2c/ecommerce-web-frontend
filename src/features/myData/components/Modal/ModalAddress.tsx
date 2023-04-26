import React, { FC } from 'react';
import { Modal } from '@components/modal';
import { Button, Grid } from '@mui/material';
import { Addresses } from '@features/authentication';
import { Close, Save } from '@mui/icons-material';
import AddressForm from '@features/myData/components/Modal/AddressForm';

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
	return (
		<Modal open={isOpen} onClose={onToggle} buttonClose>
			<Modal.Header>{isEdit ? 'Edit Address' : 'Add Address'}</Modal.Header>
			<Modal.Content>
				<AddressForm />
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
						color="success"
						disableElevation
						startIcon={<Save />}>
						Save
					</Button>
				</Grid>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalAddress;
