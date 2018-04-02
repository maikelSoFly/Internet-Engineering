import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import MenuItem from 'material-ui/MenuItem'
import Login from '../Login/Login'
import './MenuBar.css'


class MenuBar extends Component {
    state = {
        logged: false,
        drawerOpened: false,
        loginOpened: false,
        tabIndex: 'a',
        loggedIn: false,
        user: undefined
    }


    componentWillMount = () => {
        this.getUserData()
    }


    handleBurgerClick = (event) => {
        event.preventDefault()

        this.setState({
            drawerOpened: true,
            anchorEl: event.currentTarget
        })
    }


    handleDrawerClose = () => {
        this.setState({
            drawerOpened: false,
        })
    }


    handleLoginClick = () => {
        if (!this.state.loggedIn) {
            this.setState({ loginOpened: true })
        }
    };


    handleLoginClose = () => {
        this.setState({ loginOpened: false })
        this.getUserData()
    }


    getUserData = () => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:5000/user', {
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
                console.log(user)
                this.setState({ user: user, loggedIn: true })
            }).catch(err => {
                console.error(err)
            })
    }

    handleLogOut = () => {
        localStorage.removeItem('token')
        this.setState({ loggedIn: false, user: undefined })
    }


    render() {
        return (
            <div>

                <AppBar
                    className="appBar-override-styles"
                    title={<span className="title">Rocketask</span>}
                    onTitleClick={this.props.handleTitleClick}
                    iconElementLeft={<IconButton onClick={this.handleBurgerClick}>
                        <NavigationMenu />
                    </IconButton>}
                    iconElementRight={
                        <div className='menu-bar-buttons'>
                            <FlatButton
                                onClick={this.handleLoginClick}
                                label={this.state.user ? this.state.user.username : 'Log In'}
                                className="login-button"
                            />
                            {this.state.loggedIn &&
                                <FlatButton
                                    onClick={this.handleLogOut}
                                    label={'Log Out'}
                                    className="login-button"
                                />
                            }
                        </div>
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
                    loginOpened={this.state.loginOpened}
                    handleLoginClick={this.handleLoginClick}
                    handleLoginClose={this.handleLoginClose}
                />

            </div>
        )
    }
}

export default MenuBar