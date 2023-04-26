import React, { FC, ReactNode } from 'react';
import MuiModal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import { ModalContext } from '@components/modal/ModalContext';
import {
	ModalComposition,
	Footer,
	Header,
	Content,
} from '@components/modal/modalComposition';

const sizes = {
	sm: 4,
	md: 6,
	lg: 8,
	xl: 11,
};

const topAlignment = {
	default: '15%',
	center: '50%',
};

const style = {
	position: 'absolute' as 'absolute',
	left: '50%',
	bgcolor: 'background.paper',
	border: '1px #000',
	borderRadius: 1,
};

type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ModalStateProps {
	open: boolean;
	size?: Size;
	alignment?: 'center';
	buttonClose?: boolean;
	children: ReactNode;
}

interface ModalDispatchProps {
	onClose?: () => void;
}

type ModalProps = ModalStateProps & ModalDispatchProps;

const Modal: FC<ModalProps> & ModalComposition = ({
	children,
	open,
	size = 'md',
	alignment,
	onClose,
	buttonClose,
}) => {
	const vertialAlignment = {
		top: alignment ? topAlignment[alignment] : topAlignment['default'],
		transform: `translate(-50%, -${
			alignment ? topAlignment[alignment] : topAlignment['default']
		})`,
	};
	return (
		<MuiModal open={open} onClose={onClose} keepMounted>
			<ModalContext.Provider value={{ onClose, buttonClose }}>
				<Grid
					container
					item
					sx={{ ...style, ...vertialAlignment }}
					xs={sizes[size]}
					direction={'column'}>
					{children}
				</Grid>
			</ModalContext.Provider>
		</MuiModal>
	);
};

Modal.Header = Header;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
