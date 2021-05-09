import React from 'react';
import LoginButton from '../loginButton';
import LogoutButton from '../logoutButton';

const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton/> : <LoginButton/>;
};

export default AuthenticationButton;