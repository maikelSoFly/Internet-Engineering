import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'
import Login from '../Login/Login'
import './MenuBar.css'
import { withRouter } from 'react-router-dom'


class MenuBar extends Component {
    state = {
        drawerOpened: false,
        loginOpened: false,
    }


    handleBurgerClick = (event) => {
        event.preventDefault()

        this.setState({
            drawerOpened: true
        })
    }


    handleDrawerClose = () => {
        this.setState({
            drawerOpened: false,
        })
    }


    handleLoginClick = () => {
        if (this.props.user) {
            this.props.history.push('/profile')
        } else {
            this.setState({ loginOpened: true })
        }
    }


    handleLoginClose = () => {
        this.setState({ loginOpened: false })
    }


    onLoginSuccess = () => {
        this.setState({ loginOpened: false })
        this.props.setLoginState(true)
        this.props.history.push('/profile')
    }


    handleLogout = () => {
        this.props.setLoginState(false)
        this.props.history.push('/')
    }


    handleGoHome = () => {
        this.props.history.push('/')
    }


    render() {
        return (
            <div>
                <AppBar
                    className="appBar-override-styles"
                    title={<span className="title">Rocketask</span>}
                    onTitleClick={this.handleGoHome}
                    iconElementLeft={<IconButton onClick={this.handleBurgerClick}>
                        <NavigationMenu />
                    </IconButton>}
                    iconElementRight={
                        <span>
                            <FlatButton
                                onClick={this.handleLoginClick}
                                label={this.props.user ? this.props.user.username : 'Log In'}
                                className="login-button"
                            />

                            {this.props.user &&
                                <FlatButton
                                    onClick={this.handleLogout}
                                    label={'Log Out'}
                                    className="logout-button"
                                />
                            }
                        </span>
                    }
                />

                <Drawer
                    docked={false}
                    width={200}
                    zDepth={2}
                    open={this.state.drawerOpened}
                    onRequestChange={(drawerOpened) => this.setState({ drawerOpened })}
                >
                    <MenuItem onClick={this.handleDrawerClose}>My Tasks</MenuItem>
                    <MenuItem onClick={this.handleDrawerClose}>My Groups</MenuItem>
                    <MenuItem onClick={this.handleDrawerClose}>My Groups</MenuItem>
                </Drawer>

                <Login
                    loginOpened={(this.props.location.pathname !== '/' &&
                        !this.props.user) || this.state.loginOpened}
                    onLoginSuccess={this.onLoginSuccess}
                    handleLoginClose={this.handleLoginClose}
                />

            </div>
        )
    }
}

export default withRouter(MenuBar)