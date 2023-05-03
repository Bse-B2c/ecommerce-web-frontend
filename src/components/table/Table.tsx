import React, { FC, ChangeEvent } from 'react';
import {
	Box,
	Paper,
	TableContainer,
	Table as MuiTable,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	TablePagination,
	TableSortLabel,
} from '@mui/material';
import { v4 as uuidV4 } from 'uuid';
import Row from '@components/table/Row';

interface Data {
	[key: string]: any;
}

interface ScopedColumns {
	/**
	 * key - The key of Field
	 */
	[key: string]: (data: any, index: number) => JSX.Element;
}

interface Pagination {
	/**
	 * Rows per Page Options
	 */
	rowsPerPageOptions: Array<number>;
	/**
	 * Total Pages
	 */
	count: number;
	/**
	 * Rows Per Page
	 */
	rowsPerPage: number;
	/**
	 * Current page
	 */
	page: number;
}

interface Field {
	/**
	 * The label to display in the header
	 */
	label: string;
	/**
	 *	Key to identify scoped columns rendering function,
	 *	Key used to identify the property to be classified
	 */
	key: string;
}

type SortOrder = 'DESC' | 'ASC';

interface TableStateProps {
	/**
	 * The data to be rendered in the table body
	 */
	data: Array<Data>;
	/**
	 * The fields to render in the table header
	 */
	fields: Array<Field>;
	/**
	 * The width in percentage of the columns
	 */
	layout: Array<string>;
	/**
	 * Scoped Columns
	 */
	scopedColumns: ScopedColumns;
	/**
	 * Custom Header Fields
	 */
	customHeaderSlots?: { [key: string]: () => JSX.Element };
	/**
	 *	Table size
	 */
	size?: 'small' | 'medium';
	/**
	 * Pagination properties
	 */
	paginationProps?: Pagination;
	/**
	 * Sort state
	 */
	sortState?: {
		/**
		 * Sort order type
		 */
		sortOrder: SortOrder;
		/**
		 * Header key to be sorted
		 */
		orderBy: string;
	};
}
interface TableDispatchProps {
	/**
	 * Event to change the current page
	 * @param event
	 * @param newPage - new Page
	 */
	onPageChange?: (event: unknown, newPage: number) => void;
	/**
	 * Event to select the number of rows per page
	 * @param event - Input Element Change event
	 */
	onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	/**
	 *
	 * @param key - [Header key]{@link Field} to be sorted
	 * @param sortOrder - Sort order type
	 */
	onChangeSort?: (key: string, sortOrder: SortOrder) => void;
	renderExpandableRow?: (item: Data) => JSX.Element;
}

type TableProps = TableStateProps & TableDispatchProps;

/**
 * Component to render table
 *
 * @example
 *	const data = [{name: "Rodrigo", age: 24}];
 *	const fields = [{label: "Name", key: "name"}, {label:"Age", key:"age"}];
 *	const layout = ["60%","40%"];
 *	const scopedColumns = {
 *	 name: ({name}) => <div>{name}</div>,
 *	 age: ({age}) => <div>{age}</div>
 *	}
 *
 *	´Simple Usage:´
 *
 * 	<Table
 * 		data={data}
 * 		fields={fields}
 * 		layout={layout}
 * 		scopedColumns={scopedColumns}
 * 		/>
 *
 *  ´Pagination Usage´
 *
 *  <Table
 * 		data={data}
 * 		fields={fields}
 * 		layout={layout}
 * 		scopedColumns={scopedColumns}
 * 	 paginationProps={{
 * 					page: 0,
 * 					rowsPerPage: 10,
 * 					rowsPerPageOptions: [10, 20, 30, 40, 50],
 * 					count: 100,
 * 				}}
 * 		onRowsPerPageChange={(event) => { console.log(event.target.value)}}
 * 		onPageChange={(event, newPage) => {console.log(newPage)}}
 * 		/>
 *
 * 	´Sort Usage´
 *
 * 	 <Table
 * 		data={data}
 * 		fields={fields}
 * 		layout={layout}
 * 		scopedColumns={scopedColumns}
 * 	 sortState={{sortOrder: "ASC", orderBy: "name"}}
 * 	 onChangeSort={(key, sortOrder) => console.log(key, sortOrder)}
 * 		/>
 */
const Table: FC<TableProps> = ({
	data,
	fields,
	scopedColumns,
	size = 'small',
	layout,
	customHeaderSlots,
	paginationProps,
	sortState,
	onRowsPerPageChange,
	onPageChange,
	onChangeSort,
	renderExpandableRow,
}) => {
	const fieldsExists: boolean = Array.isArray(fields) && fields.length > 0;
	const bodyExists: boolean = Array.isArray(data) && data.length > 0;

	const body =
		bodyExists && fieldsExists ? (
			data.map(itemRow => {
				const isExpandableRow = !!renderExpandableRow;
				return (
					<Row
						key={uuidV4()}
						isCollapse={isExpandableRow}
						item={itemRow}
						renderExpandableRow={renderExpandableRow}>
						{fields.map((field, index) => {
							const renderColumn = scopedColumns[field.key];

							return (
								<TableCell
									key={uuidV4()}
									width={layout[index] ?? 'auto'}
									sx={isExpandableRow ? { borderBottom: 'unset' } : undefined}>
									{renderColumn ? renderColumn(itemRow, index) : <div></div>}
								</TableCell>
							);
						})}
					</Row>
				);
			})
		) : (
			<TableRow>
				<TableCell colSpan={fields.length} align="center" size="medium">
					No items found
				</TableCell>
			</TableRow>
		);

	const header = fieldsExists
		? fields.map((field, index) => {
				const renderColumnHeader = customHeaderSlots
					? customHeaderSlots[field.key]
					: undefined;

				if (onChangeSort && sortState) {
					const { sortOrder, orderBy } = sortState;
					const direction = sortOrder === 'DESC' ? 'desc' : 'asc';

					return (
						<TableCell key={uuidV4()} width={layout[index] ?? 'auto'}>
							<TableSortLabel
								active={orderBy === field.key}
								direction={direction}
								onClick={() =>
									onChangeSort(field.key, sortOrder === 'DESC' ? 'ASC' : 'DESC')
								}>
								{field.label}
							</TableSortLabel>
						</TableCell>
					);
				}

				return (
					<TableCell key={uuidV4()} width={layout[index] ?? 'auto'}>
						{renderColumnHeader ? renderColumnHeader() : field.label}
					</TableCell>
				);
		  })
		: null;

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
				<TableContainer>
					<MuiTable size={size}>
						<TableHead>
							<TableRow>
								{fieldsExists && renderExpandableRow && (
									<TableCell key={uuidV4()} width={'3%'}></TableCell>
								)}
								{header}
							</TableRow>
						</TableHead>
						<TableBody>{body}</TableBody>
					</MuiTable>
				</TableContainer>
				{paginationProps && onPageChange && onRowsPerPageChange && (
					<TablePagination
						rowsPerPageOptions={paginationProps.rowsPerPageOptions}
						component="div"
						count={paginationProps.count}
						rowsPerPage={paginationProps.rowsPerPage}
						page={paginationProps.page}
						onPageChange={onPageChange}
						onRowsPerPageChange={onRowsPerPageChange}
					/>
				)}
			</Paper>
		</Box>
	);
};

export default Table;
