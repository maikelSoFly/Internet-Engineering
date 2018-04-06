import React from 'react'
import {
    Route,
    Redirect
} from 'react-router-dom'



export default ({ component: Component, condition: condition, ...rest }) => {
    if (condition) {
        return <Route {...rest} render={props => (
            <Component {...props} />
        )} />
    } else {
        return <Route {...rest} render={() => <Redirect to='/' />
        } />
    }
}