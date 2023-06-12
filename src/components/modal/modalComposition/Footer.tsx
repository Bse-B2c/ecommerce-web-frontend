import React, { FC, ReactNode } from 'react';
import { Divider, Grid } from '@mui/material';

interface FooterStateProps {
	children: ReactNode;
}
interface FooterDispatchProps {}

export type FooterProps = FooterStateProps & FooterDispatchProps;

const Footer: FC<FooterProps> = ({ children }) => {
	return (
		<>
			<Divider light />
			<Grid item xs padding={2}>
				{children}
			</Grid>
		</>
	);
};

export default Footer;
