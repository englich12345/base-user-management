import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUser } from './localStorage';

export const PrivateRoute = ({ component: Component, ...rest }) => {
    console.log(" getUser('token')",  rest)
    return (
        <Route {...rest} render={props => (
            getUser('token')
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login'}} />
        )} />
        // <Route {...rest} render={props => (
        //     getUser('token')
        //         ? <Component {...props} />
        //         : <Redirect exact to={{ path: '/login', state: { from: props.location } }} />
        // )} />
    )   
}