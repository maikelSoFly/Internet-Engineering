import React, { Component } from 'react'
import './App.css'
import MenuBar from './Components/MenuBar/MenuBar'
import { lightBlue100 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import Profile from './Components/Profile/Profile'
import SecureRoute from './Components/SecureRoute/SecureRoute'
import apiConfig from './api-config'


class App extends Component {
    state = {
        loggedIn: false,
        user: undefined,
        needAuth: false,
    }


    componentWillMount = () => {
        if (localStorage.getItem('token')) {
            this.requestUserData()
        }
    }

    setNeedAuth = state => {
        this.setState({ needAuth: state })
    }


    muiTheme = getMuiTheme({
        palette: {
            primary1Color: '#0A163D',
        },
        appBar: {
            textColor: lightBlue100,
            height: 60
        },
    });


    getProfileComponent = () => {
        return (
            <Profile
                user={this.state.user}
            />
        )
    }

    requestUserData = () => {
        const token = localStorage.getItem('token')
        fetch(apiConfig.getRoute('user'), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                } else if (res.status === 401) {
                    localStorage.removeItem('token')
                    this.setState({ loggedIn: false })
                    throw new Error(res.statusText)
                }
                return res
            })
            .then(res => {
                return res.json()
            })
            .then(user => {
                this.setState({ user: user, loggedIn: true })
            }).catch(err => {
                console.error(err)
            })
    }


    setLoginState = state => {
        if (state) {
            this.setState({ loggedIn: true })
            this.requestUserData()
        } else {
            localStorage.removeItem('token')
            this.setState({ loggedIn: false, user: undefined })
        }
    }

    SecureRoute = ({ component: Component, ...rest }) => {
        if (this.state.loggedIn) {
            return <Route {...rest} render={props => (
                <Component {...props} />
            )} />
        } else {
            return <Route {...rest} render={props => (
                <Redirect to='/' />
            )} />
        }
    }



    render() {
        return (
            <Router>
                <div className="App">
                    <MuiThemeProvider muiTheme={this.muiTheme}>
                        <div>
                            <MenuBar
                                user={this.state.user}
                                setLoginState={(state) => this.setLoginState(state)}
                            />

                            {/* <Route exact path="/" component={Home} /> */}

                            <this.SecureRoute path='/profile' component={this.getProfileComponent} />


                        </div>

                    </MuiThemeProvider>

                </div>
            </Router>
        )
    }
}

export default App
