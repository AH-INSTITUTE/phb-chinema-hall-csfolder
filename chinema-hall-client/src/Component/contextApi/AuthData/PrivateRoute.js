import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from './Auth';


const PrivateRoute = ({ children, ...rest }) => {
    const auth = useContext(AuthContext);
    const getUser = sessionStorage.getItem('user');
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.user || getUser != null ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
};
export default PrivateRoute;