import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { FC } from 'react';
import { Addresses } from '@features/authentication';
import Address from '@components/Address';

interface ModalAddressStateProps {
	isOpen: boolean;
	idSelected: number;
	addresses: Array<Addresses>;
}
interface ModalAddressDispatchProps {
	onClose: () => void;
	onChangeAddress: (item: Addresses) => void;
}

type ModalAddressProps = ModalAddressStateProps & ModalAddressDispatchProps;

const ModalAddress: FC<ModalAddressProps> = ({
	isOpen,
	idSelected,
	addresses,
	onClose,
	onChangeAddress,
}) => {
	return (
		<div>
			<Dialog disableEscapeKeyDown open={isOpen} onClose={onClose}>
				<DialogTitle sx={{ m: 0, p: 2 }}>
					Choose Address
					{onClose ? (
						<IconButton
							aria-label="close"
							onClick={onClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8,
								color: theme => theme.palette.grey[500],
							}}>
							<CloseIcon />
						</IconButton>
					) : null}
				</DialogTitle>
				<Divider variant={'fullWidth'} />
				<DialogContent>
					{addresses.map(
						({
							id,
							streetName,
							city,
							zipCode,
							houseNumber,
							region,
							country,
							apartment,
						}) => (
							<Box key={`${streetName}-${id}`} sx={{ mb: 1 }}>
								<Address
									isSelected={idSelected === id}
									id={id}
									streetName={streetName}
									city={city}
									country={country}
									apartment={apartment}
									houseNumber={houseNumber}
									zipCode={zipCode}
									region={region}
									onSelect={item => {
										onChangeAddress(item);
										onClose();
									}}
								/>
							</Box>
						)
					)}
				</DialogContent>
				<Divider variant={'fullWidth'} />
				<DialogActions>
					<Button
						variant="contained"
						size="small"
						disableElevation
						startIcon={<CloseIcon />}
						onClick={() => {
							onClose();
						}}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ModalAddress;
