import React, { FC } from 'react';
import { Modal } from '@components/modal';
import {
	TextareaAutosize,
	Grid,
	Rating,
	Typography,
	Button,
} from '@mui/material';
import { Save, Close } from '@mui/icons-material';

interface ProductReviewModalStateProps {
	isOpen: boolean;
}
interface ProductReviewModalDispatchProps {
	onClose: () => void;
}

type ProductReviewModalProps = ProductReviewModalStateProps &
	ProductReviewModalDispatchProps;

const ProductReviewModal: FC<ProductReviewModalProps> = ({
	isOpen,
	onClose,
}) => {
	return (
		<Modal open={isOpen} onClose={onClose} buttonClose>
			<Modal.Header>Product Review</Modal.Header>
			<Modal.Content>
				<Grid container direction="column" item xs>
					<Grid item xs>
						<Typography>Rating</Typography>
						<Rating name="simple-controlled" value={4} onChange={() => {}} />
					</Grid>
					<Grid item xs>
						<Typography>Review</Typography>
						<TextareaAutosize
							placeholder={'Review'}
							minRows={4}
							style={{ minWidth: '100%' }}
						/>
					</Grid>
				</Grid>
			</Modal.Content>
			<Modal.Footer>
				<Grid container item xs justifyContent="end">
					<Button
						sx={{ mr: 1 }}
						size="small"
						variant="contained"
						disableElevation
						onClick={onClose}
						startIcon={<Close />}>
						Close
					</Button>
					<Button
						color="success"
						size="small"
						variant="contained"
						disableElevation
						startIcon={<Save />}>
						Create
					</Button>
				</Grid>
			</Modal.Footer>
		</Modal>
	);
};

export default ProductReviewModal;
