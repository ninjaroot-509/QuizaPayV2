import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Sessions'

export default function ResgisterRoute({ component: Component, ...rest }) {
    return ( 
            <Route 
                {...rest }
                render = {
                    (props) => !getToken() ?
                        <Component {...props } /> 
                    :
                        <Redirect to={{ pathname: '/etape-1' }}/>
                } 
            />
        )
    }