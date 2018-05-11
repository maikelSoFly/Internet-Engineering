import React, { Component, Fragment } from 'react'
import './Profile.css'
import Paper from 'material-ui/Paper'
import SnackbarPanel from '../SnackbarPanel/SnackbarPanel'
import { UserContext } from '../../contexts'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import update from 'immutability-helper';



class Profile extends Component {
	state = {
		selectedTasks: []
	}

	styles = {
		root: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
		},
		gridList: {
			display: 'flex',
			flexWrap: 'nowrap',
			overflowX: 'auto',
			overflowY: 'visible',
		},
		titleStyle: {
			position: 'relative',
			color: 'rgb(0, 188, 212)',
		},
		tile: {
			width: '200px',
			background: '#11fd34',
			boxSizing: 'border-box',
		},
		selectedTile: {
			width: '200px',
			boxSizing: 'border-box',
			background: '#11fd34',
			borderStyle: 'solid',
			borderWidth: '2px',
			borderColor: 'red',
		},
		tileContent: {
			padding: '10px',
		}
	};


	addToSelected = task => {
		var index = this.state.selectedTasks.indexOf(task);
		if (index > -1) {
			this.setState(prevState => ({
				selectedTasks: update(prevState.selectedTasks, { $splice: [[index, 1]] })
			}))
		} else {
			this.setState(prevState => ({
				selectedTasks: [...prevState.selectedTasks, task]
			}))
		}
	}

	render() {
		const user = this.props.user

		return (
			<Fragment>
				<UserContext.Consumer>
					{({ user, userUpdate }) => (
						<Fragment>
							<SnackbarPanel
								user={this.props.user}
								userUpdate={userUpdate}
								selectedTasks={this.state.selectedTasks} />


							<div className='tasks-wrapper'>
								<div className='urgents'>
									{user && user.tasks.map((task) =>
										<Paper
											className={this.state.selectedTasks.includes(task) ? 'selected-task-paper' : 'task-paper'}
											key={task._id}
											zDepth={this.state.selectedTasks.includes(task) ? 5 : 2}
											onClick={() => this.addToSelected(task)}
										>
											{task.title} <br /> <br />
											{task.description} <br />

										</Paper>
									)}
								</div>

								<div className='moderates'>
									{user && user.tasks.map((task) =>
										<Paper
											className={this.state.selectedTasks.includes(task) ? 'selected-task-paper' : 'task-paper'}
											key={task._id}
											zDepth={this.state.selectedTasks.includes(task) ? 5 : 2}
											onClick={() => this.addToSelected(task)}
										>
											{task.title} <br /> <br />
											{task.description} <br />

										</Paper>
									)}
								</div>
								<div className='optionals'>
									{user && user.tasks.map((task) =>
										<Paper
											className={this.state.selectedTasks.includes(task) ? 'selected-task-paper' : 'task-paper'}
											key={task._id}
											zDepth={this.state.selectedTasks.includes(task) ? 5 : 2}
											onClick={() => this.addToSelected(task)}
										>
											{task.title} <br /> <br />
											{task.description} <br />
										</Paper>
									)}
								</div>
							</div>
						</Fragment>
					)}
				</UserContext.Consumer>
			</Fragment >
		)
	}
}

export default Profile