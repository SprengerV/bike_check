import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain="sprengerv.us.auth0.com"
            clientId="56KCkjC82g0QNP75lXVhyBiE97QXX7Li"
            redirectUri={ window.location.origin }
            onRedirectCallback={ onRedirectCallback }
        >
            { children }
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;