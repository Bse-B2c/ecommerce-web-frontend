import React, { FC } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/store';
import { close } from '@store/notification/notificationSlice';

interface NotificationStateProps {}
interface NotificationDispatchProps {}

type NotificationProps = NotificationStateProps & NotificationDispatchProps;

const Notification: FC<NotificationProps> = () => {
	const dispatch = useDispatch();
	const { open, message, type, hideDuration } = useSelector(
		(state: RootState) => state.notification
	);

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(close());
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={hideDuration}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			onClose={handleClose}>
			<Alert severity={type} onClose={handleClose}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Notification;
