import React, { Component, Fragment } from 'react'
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

	constructor(props) {
		super(props)
		this.state = {
			drawerOpened: false,
			loginDialogOpened: false,
		}
	}


	handleBurgerClick = event => {
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
			this.props.userUpdate()
			this.props.history.push('/profile')
		} else {
			this.setState({ loginDialogOpened: true })
		}
	}


	handleLoginClose = () => {
		this.setState({ loginDialogOpened: false })
	}


	onLoginSuccess = () => {
		this.setState({ loginDialogOpened: false })
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
		const user = this.props.user
		return (
			<Fragment>
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
								label={user ? user.username : 'Log In'}
								className="login-button"
							/>

							{user &&
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
					loginOpened={this.state.loginDialogOpened}
					onLoginSuccess={this.onLoginSuccess}
					handleLoginClose={this.handleLoginClose}
				/>
			</Fragment>
		)
	}
}

export default withRouter(MenuBar)