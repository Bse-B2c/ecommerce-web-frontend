import React, { FC, ReactNode } from 'react';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useModalContext } from '@components/modal/ModalContext';

interface HeaderStateProps {
	children: ReactNode;
}
interface HeaderDispatchProps {}

export type HeaderProps = HeaderStateProps & HeaderDispatchProps;

const Header: FC<HeaderProps> = ({ children }) => {
	const { buttonClose, onClose } = useModalContext();

	return (
		<>
			<Grid item xs>
				<Grid container justifyContent="space-between" padding={2}>
					<Typography variant="h6">{children}</Typography>
					{buttonClose && onClose && (
						<IconButton size="small" onClick={onClose}>
							<Close fontSize="small" />
						</IconButton>
					)}
				</Grid>
			</Grid>
			<Divider light />
		</>
	);
};

export default Header;
