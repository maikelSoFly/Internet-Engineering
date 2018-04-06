import React, { Component } from 'react-dom'
import { Route, Redirect } from 'react-router-dom'

const SecureRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        true
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)

export default SecureRoute