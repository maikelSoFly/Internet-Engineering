import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import apiConfig from '../../api-config'


class Login extends Component {
    state = {
        tabIndex: 'login',
        login: '',
        username: '',
        email: '',
        password: '',
        snackbarOpened: false,
        snackbarMessage: ''
    }


    onTabChange = (value) => {
        this.setState({
            tabIndex: value,
        })
    }


    onSubmit = () => {
        if (this.state.tabIndex === 'login') {
            const userCredentials = JSON.stringify({
                username: this.state.login,
                password: this.state.password
            })

            fetch(apiConfig.getRoute('login'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: userCredentials
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.statusText)
                    }
                    return res
                })
                .then(res => {
                    return res.json()
                })
                .then(jsonRes => {
                    console.log(jsonRes)
                    localStorage.setItem('token', jsonRes.token)
                    this.props.onLoginSuccess()
                })
                .catch(err => {
                    console.error(err)
                })
        } else {
            const userCredentials = JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
            fetch(apiConfig.getRoute('register'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userCredentials
            })
                .then(res => {
                    if (!res.ok) {
                        throw new Error(res.statusText)
                    }
                    this.setState({
                        snackbarOpened: true,
                        snackbarMessage: 'You have registered successfuly',
                        tabIndex: 'login'
                    })
                    return res
                })
                .then(res => {
                    return res.json()
                })
                .then(jsonRes => {
                    console.log(jsonRes)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }


    onLoginChanged = event => {
        this.setState({ login: event.target.value })
    }


    onUsernameChanged = event => {
        this.setState({ username: event.target.value })
    }


    onEmailChanged = event => {
        this.setState({ email: event.target.value })
    }


    onPasswordChanged = event => {
        this.setState({ password: event.target.value })
    }

    handleRequestSnackbarClose = () => {
        this.setState({
            snackbarOpened: false,
            snackbarMessage: ''
        });
    };


    render() {
        const submitButtonText = this.state.tabIndex === 'login' ? 'Log In' : 'Register'
        const actions = [
            <FlatButton
                label={submitButtonText}
                primary={true}
                keyboardFocused={true}
                onClick={this.onSubmit}
            />,
        ]

        return (
            <div>

                <Dialog
                    title="Log in to Rocketask"
                    actions={actions}
                    modal={false}
                    open={this.props.loginOpened}
                    onRequestClose={this.props.handleLoginClose}
                >
                    <Tabs
                        value={this.state.tabIndex}
                        onChange={this.onTabChange}
                    >

                        <Tab label="Log In" value="login">
                            <div>
                                <TextField
                                    hintText="user@rocketask.com"
                                    floatingLabelText="Username or email"
                                    floatingLabelFixed={true}
                                    onChange={this.onLoginChanged}
                                /><br />
                                <TextField
                                    floatingLabelText="Password"
                                    floatingLabelFixed={true}
                                    type="password"
                                    onChange={this.onPasswordChanged}
                                /><br />
                            </div>
                        </Tab>

                        <Tab label="Sign Up" value="register">
                            <div>
                                <TextField
                                    hintText="user"
                                    floatingLabelText="Username"
                                    floatingLabelFixed={true}
                                    onChange={this.onUsernameChanged}
                                /><br />
                                <TextField
                                    hintText="user@rocketask.com"
                                    floatingLabelText="E-mail"
                                    floatingLabelFixed={true}
                                    onChange={this.onEmailChanged}
                                /><br />
                                <TextField
                                    floatingLabelText="Password"
                                    floatingLabelFixed={true}
                                    type="password"
                                    onChange={this.onPasswordChanged}
                                /><br />
                            </div>
                        </Tab>

                    </Tabs>

                </Dialog>

                <Snackbar
                    open={this.state.snackbarOpened}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestSnackbarClose}
                />
            </div>
        )
    }
}

export default Login