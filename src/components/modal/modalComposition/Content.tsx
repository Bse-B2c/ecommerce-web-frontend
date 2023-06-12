import React, { FC, ReactNode } from 'react';
import { Grid } from '@mui/material';

interface ContentStateProps {
	children: ReactNode;
}
interface ContentDispatchProps {}

export type ContentProps = ContentStateProps & ContentDispatchProps;

const Content: FC<ContentProps> = ({ children }) => {
	return (
		<Grid item xs padding={2}>
			{children}
		</Grid>
	);
};

export default Content;
