import React, { ComponentProps } from 'react';
import { IMaskMixin } from 'react-imask';
import { TextField, TextFieldProps } from '@mui/material';

const InternalMaskInput = IMaskMixin(({ onChange, value, ...props }) => {
	return (
		<TextField
			{...(props as any)}
			size="small"
			variant={'outlined'}
			fullWidth
		/>
	);
});

type MaskProps = ComponentProps<typeof InternalMaskInput>;

const TextMaskInput = (props: TextFieldProps & MaskProps) => {
	return <InternalMaskInput {...props} />;
};

export default TextMaskInput;
