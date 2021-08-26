import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken, getUser } from './Sessions'

export default function PublicRoute({ component: Component, ...rest }) {
    const user = getUser()
    return ( 
            <Route 
                {...rest }
                render = {
                    (props) => !getToken() ?
                        <Component {...props } /> 
                    :
                    user.is_complete === true?
                        <Redirect to={{ pathname: '/' }}/>
                    :
                        <Redirect to={{ pathname: '/complete-inscription' }} />
                } 
            />
        )
    }