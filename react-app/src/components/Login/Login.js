import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import { Tabs, Tab } from 'material-ui/Tabs'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'


class Login extends Component {
    state = {
        tabIndex: 'login',
        login: '',
        username: '',
        email: '',
        password: ''
    }


    handleTabChange = (value) => {
        this.setState({
            tabIndex: value,
        })
    }


    onSubmit = () => {
        // if (this.state.tabIndex === 'login') {

        // } else {

        // }
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


    render() {
        const submitButtonText = this.state.tabIndex == 'login' ? 'Log In' : 'Register'
        const actions = [
            <FlatButton
                label={submitButtonText}
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleLoginClose}
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
                        onChange={this.handleTabChange}
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
                                <DatePicker
                                    floatingLabelText="Birth date"
                                    floatingLabelFixed={true}
                                    openToYearSelection={true} />
                                <TextField
                                    floatingLabelText="Password"
                                    floatingLabelFixed={true}
                                    type="password"
                                    onChange={this.PasswordChanged}
                                /><br />
                            </div>
                        </Tab>

                    </Tabs>

                </Dialog>
            </div>
        )
    }
}

export default Login