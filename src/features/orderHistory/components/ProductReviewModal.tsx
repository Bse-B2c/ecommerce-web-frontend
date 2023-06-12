import React, { FC, useEffect } from 'react';
import { Modal } from '@components/modal';
import {
	Grid,
	Rating as RatingMui,
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
import {
	useCreateRatingMutation,
	useEditRatingMutation,
} from '@store/api/ratingApi';
import { useAuthUser } from '@hooks/useAuthUser';
import { showNotification } from '@store/notification/notificationSlice';
import { useDispatch } from 'react-redux';
import { ApiResponse } from '@src/model/ApiResponse';
import { Rating } from '@src/model/Rating';

interface ProductReviewModalStateProps {
	isEdit: boolean;
	isOpen: boolean;
	productId: number;
	purchaseDate: string;
	review?: Rating;
}
interface ProductReviewModalDispatchProps {
	onClose: () => void;
}

type ProductReviewModalProps = ProductReviewModalStateProps &
	ProductReviewModalDispatchProps;

const ProductReviewModal: FC<ProductReviewModalProps> = ({
	isOpen,
	isEdit,
	review,
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
		setValue,
		watch,
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
	const [editRating] = useEditRatingMutation();
	const { user } = useAuthUser();

	useEffect(() => {
		if (isEdit && review) {
			setValue('rating', review.ratingScale);
			setValue('writeRating', review.comment);
			setValue('profile', review.authorName === 'Anonymous');
		} else {
			reset();
		}
	}, [isEdit, review]);

	const onSubmit = async (data: any) => {
		try {
			if (user) {
				const userName = data.profile ? 'Anonymous' : user.name.split(' ')[0];

				if (isEdit) {
					await editRating({
						id: review?.id || -1,
						authorName: userName,
						ratingScale: data.rating,
						comment: data.writeRating,
					});

					dispatch(
						showNotification({
							type: 'success',
							message: 'Review edited successfully',
						})
					);
				} else {
					await createRating({
						ratingScale: data.rating,
						comment: data.writeRating,
						authorId: user.id,
						authorName: userName,
						productId,
						purchaseDate,
					});

					dispatch(
						showNotification({
							type: 'success',
							message: 'Review created successfully',
						})
					);
				}

				reset();
				clearErrors();
				onClose();
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
										<RatingMui
											value={Number(value)}
											max={5}
											onChange={onChange}
										/>
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
								InputLabelProps={{ shrink: !!watch('writeRating') }}
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
							{isEdit ? 'Save' : 'Create'}
						</Button>
					</Grid>
				</Modal.Footer>
			</FormControl>
		</Modal>
	);
};

export default ProductReviewModal;
