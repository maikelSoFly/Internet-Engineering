import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'


export default ({ component: Component, condition: _condition, ...rest }) => {
    if (_condition()) {
        return <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    } else {
        return <Route {...rest} render={() => <Redirect to='/' />
        } />
    }
}