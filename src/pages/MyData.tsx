import React, { FC } from 'react';

interface MyDataStateProps {}
interface MyDataDispatchProps {}

type MyDataProps = MyDataStateProps & MyDataDispatchProps;

const MyData: FC<MyDataProps> = () => {
	return <div />;
};

export default MyData;
