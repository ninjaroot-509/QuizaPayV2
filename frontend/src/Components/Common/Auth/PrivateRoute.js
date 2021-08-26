import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken, getUser } from './Sessions'

export default function PrivateRoute({ component: Component, ...rest }) {
    const user = getUser()
    return (
        <Route {...rest}
            render={
                (props) => getToken() ? 
                    user.is_complete === true?
                        <Component {...props} />
                    :
                        <Redirect to={{ pathname: '/complete-inscription', state: { from: props.location } }} />
                    : 
                        <Redirect to={{ pathname: '/connexion', state: { from: props.location } }} />
                }
        />
    )
}