import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider, } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();

    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
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