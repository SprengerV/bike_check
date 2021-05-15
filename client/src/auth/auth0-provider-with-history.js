import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import api from '../controllers/api';

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();
    const { user, getAccessTokenSilently } = useAuth0();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
        const token = getAccessTokenSilently();
        api.userCreate(user, token);
    };

    return (
        <Auth0Provider
            domain="sprengerv.us.auth0.com"
            clientId="jyevD1V5GflsdusmwlmfmANS1dvOUjsN"
            audience="bike-check"
            redirectUri={ window.location.origin }
            onRedirectCallback={ onRedirectCallback }
        >
            { children }
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;