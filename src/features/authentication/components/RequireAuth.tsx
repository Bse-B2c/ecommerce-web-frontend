import React, { FC } from 'react';
import { useAuthUser } from '@hooks/useAuthUser';
import { Navigate, Outlet } from 'react-router-dom';
import { getRefreshToken, getToken } from '@features/authentication';

interface RequireAuthStateProps {}
interface RequireAuthDispatchProps {}

type RequireAuthProps = RequireAuthStateProps & RequireAuthDispatchProps;

const RequireAuth: FC<RequireAuthProps> = () => {
	const { user, isLoading, isFetching, isUninitialized } = useAuthUser();
	const token = getToken();
	const refreshToken = getRefreshToken();

	if (isUninitialized && !token && !refreshToken)
		return <Navigate to={'/unauthorized'} />;

	if (isLoading || isFetching || isUninitialized) return null;

	if (user && user.id) return <Outlet context={{ user: user }} />;

	return <Navigate to={'/unauthorized'} />;
};

export default RequireAuth;
