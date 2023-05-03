import React, { FC, ReactNode, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { Box, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

interface Data {
	[key: string]: any;
}

interface RowStateProps {
	isCollapse: boolean;
	children: ReactNode;
	item: Data;
}
interface RowDispatchProps {
	renderExpandableRow?: (item: Data) => JSX.Element;
}

type RowProps = RowStateProps & RowDispatchProps;

const Row: FC<RowProps> = ({
	children,
	isCollapse,
	item,
	renderExpandableRow,
}) => {
	const [open, setOpen] = useState(false);

	const columnButton = (
		<TableCell sx={{ borderBottom: 'unset' }}>
			<IconButton
				aria-label="expand row"
				size="small"
				onClick={() => setOpen(!open)}>
				{open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
			</IconButton>
		</TableCell>
	);

	return (
		<React.Fragment>
			<TableRow key={uuidV4()}>
				{isCollapse && columnButton}
				{children}
			</TableRow>
			{isCollapse && (
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box sx={{ margin: 1 }}>
								{renderExpandableRow && renderExpandableRow(item)}
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			)}
		</React.Fragment>
	);
};

export default Row;
