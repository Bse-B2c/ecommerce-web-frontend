import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddItemMutation } from '@store/api/orderApi';
import { ApiResponse } from '@src/model/ApiResponse';
import { showNotification } from '@store/notification/notificationSlice';
import { useAuthUser } from '@hooks/useAuthUser';

interface Item {
	productId: number;
	price: number;
	discount?: number;
}

export const useAddItem = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [addItem] = useAddItemMutation();
	const { user } = useAuthUser();

	const addProductInCart = async (
		isBuyNowMode: boolean,
		{ productId, price }: Item
	) => {
		try {
			if (user && user.id) {
				const response = await addItem({
					productId: productId,
					price,
				});

				const { error } = response as unknown as { error: ApiResponse<null> };

				if (error) {
					dispatch(
						showNotification({
							type: 'error',
							message: error.error?.message || 'Something went wrong',
						})
					);
				} else {
					if (isBuyNowMode) navigate('/shopcart');

					dispatch(
						showNotification({
							type: 'success',
							message: 'Product added successfully',
						})
					);
				}
			} else {
				dispatch(
					showNotification({
						type: 'warning',
						message: 'Please sign In or sign Up first',
					})
				);

				navigate('/login');
			}
		} catch (e) {
			const error = e as { data: ApiResponse<null> };
			const message = error?.data?.error
				? error.data.error.message
				: 'Something went wrong';

			dispatch(showNotification({ type: 'error', message }));
		}
	};

	return { addProductInCart };
};
