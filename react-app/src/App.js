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
import apiConfig from './api-config'
import SecureRoute from './SecureRoute'
import { UserContext } from './contexts'




class App extends Component {
	state = {
		loggedIn: false,
		user: undefined,
	}


	componentWillMount = () => {
		if (localStorage.getItem('token')) {
			this.requestUserData()
		}
	}


	muiTheme = getMuiTheme({
		palette: {
			primary1Color: '#0A163D',
		},
		appBar: {
			textColor: lightBlue100,
			height: 60
		},
	})


	requestUserData = () => {
		return new Promise((resolve, reject) => {
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
					console.log('USER_UPDATED')
					resolve(true)
				}).catch(err => {
					console.error(err)
					reject(false)
				})
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


	render() {
		return (
			<Router>
				<div className="App">
					<MuiThemeProvider muiTheme={this.muiTheme}>
						<UserContext.Provider value={{ user: this.state.user, userUpdate: this.requestUserData }}>
							<div>
								<MenuBar
									user={this.state.user}
									userUpdate={this.requestUserData}
									setLoginState={(state) => this.setLoginState(state)}
								/>

								<div className='container'>
									<Route exact path="/" component={() => <div>HOME COMPONENT</div>} />


									<SecureRoute
										path='/profile'
										component={() => <Profile user={this.state.user} userUpdate={this.requestUserData} />}
										condition={() => localStorage.getItem('token')}
									/>
								</div>
							</div>
						</UserContext.Provider>
					</MuiThemeProvider>
				</div>
			</Router>
		)
	}
}

export default App
