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
        tabIndex: 'a'
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
        this.setState({ loginOpened: true })
    };


    handleLoginClose = () => {
        this.setState({ loginOpened: false })
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
                    iconElementRight={<FlatButton onClick={this.handleLoginClick} label="Log In" />}
                />

                <Drawer
                    docked={false}
                    width={200}
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