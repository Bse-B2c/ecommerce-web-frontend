import React, { FC } from 'react';
import { Modal } from '@components/modal';
import {
	Grid,
	Rating,
	Typography,
	Button,
	TextField,
	Box,
	FormControlLabel,
	Switch,
	FormControl,
} from '@mui/material';
import { Save, Close } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object } from 'yup';
import { useCreateRatingMutation } from '@store/api/ratingApi';
import { useAuthUser } from '@hooks/useAuthUser';
import { showNotification } from '@store/notification/notificationSlice';
import { useDispatch } from 'react-redux';
import { ApiResponse } from '@src/model/ApiResponse';

interface ProductReviewModalStateProps {
	isOpen: boolean;
	productId: number;
	purchaseDate: string;
}
interface ProductReviewModalDispatchProps {
	onClose: () => void;
}

type ProductReviewModalProps = ProductReviewModalStateProps &
	ProductReviewModalDispatchProps;

const ProductReviewModal: FC<ProductReviewModalProps> = ({
	isOpen,
	purchaseDate,
	productId,
	onClose,
}) => {
	const dispatch = useDispatch();
	const {
		register,
		control,
		handleSubmit,
		reset,
		clearErrors,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(
			object().shape({
				rating: number().required('Rating is a required field').max(5),
			})
		),
		criteriaMode: 'all',
		mode: 'all',
	});
	const [createRating] = useCreateRatingMutation();
	const { user } = useAuthUser();
	const onSubmit = async (data: any) => {
		try {
			if (user) {
				const userName = data.profile ? 'Anonymous' : user.name.split(' ')[0];
				await createRating({
					ratingScale: data.rating,
					comment: data.writeRating,
					authorId: user.id,
					authorName: userName,
					productId,
					purchaseDate,
				});

				reset();
				clearErrors();
				onClose();
				dispatch(
					showNotification({
						type: 'success',
						message: 'Review created successfully',
					})
				);
			}
		} catch (e) {
			const error = e as { data: ApiResponse<null> };
			const message = error?.data?.error
				? error.data.error.message
				: 'Something went wrong';

			dispatch(showNotification({ type: 'error', message }));
		}
	};

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				reset();
				clearErrors();
				onClose();
			}}
			buttonClose>
			<Modal.Header>Product Review</Modal.Header>
			<FormControl component="form" onSubmit={handleSubmit(onSubmit)}>
				<Modal.Content>
					<Grid container direction="column" item xs spacing={2}>
						<Grid
							container
							item
							xs
							justifyContent="space-between"
							alignItems="center">
							<Box>
								<Typography>Rating</Typography>
								<Controller
									control={control}
									name="rating"
									render={({ field: { onChange, value } }) => (
										<Rating value={Number(value)} max={5} onChange={onChange} />
									)}
								/>
								{errors?.rating?.message && (
									<Typography variant="body2" color="red">
										{errors?.rating?.message as string}
									</Typography>
								)}
							</Box>
							<Box>
								<Controller
									control={control}
									name={'profile'}
									defaultValue={false}
									render={({ field: { onChange, value } }) => (
										<FormControlLabel
											control={
												<Switch
													checked={value}
													onChange={(event, checked) => {
														onChange(checked);
													}}
													name="Anonymous"
													inputProps={{ 'aria-label': 'controlled' }}
												/>
											}
											label="Anonymous"
										/>
									)}
								/>
							</Box>
						</Grid>
						<Grid item xs>
							<TextField
								{...register('writeRating')}
								label="Write Rating"
								multiline
								rows={10}
								fullWidth
								placeholder="What did you like or dislike?"
								variant="outlined"
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
							onClick={() => {
								reset();
								clearErrors();
								onClose();
							}}
							startIcon={<Close />}>
							Close
						</Button>
						<Button
							color="success"
							size="small"
							variant="contained"
							type="submit"
							disableElevation
							startIcon={<Save />}>
							Create
						</Button>
					</Grid>
				</Modal.Footer>
			</FormControl>
		</Modal>
	);
};

export default ProductReviewModal;
