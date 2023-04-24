import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type NotificationType = 'success' | 'error' | 'info' | 'warning';

type NotificationPayload = {
	message: string;
	type: NotificationType;
};

interface State {
	open: boolean;
	message: string;
	type: NotificationType;
	hideDuration: number;
}

const initialState: State = {
	open: false,
	message: '',
	type: 'success',
	hideDuration: 6000,
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification: (
			state,
			{ payload }: PayloadAction<NotificationPayload>
		) => {
			const { type, message } = payload;
			state.open = true;
			state.message = message;
			state.type = type;
		},
		close: state => {
			state.open = false;
			state.message = '';
			state.type = 'success';
		},
	},
});

export const { showNotification, close } = notificationSlice.actions;
export default notificationSlice.reducer;
