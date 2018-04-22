import React, { Component, Fragment } from 'react'
import './Profile.css'
import Paper from 'material-ui/Paper'
import SnackbarPanel from '../SnackbarPanel/SnackbarPanel'
import { UserContext } from '../../contexts'
import update from 'immutability-helper';



class Profile extends Component {
	state = {
		selectedTasks: []
	}


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
								userUpdate={userUpdate}
								selectedTasks={this.state.selectedTasks} />

							<div className='tasks-wrapper'>
								<div className='optionals'>
									{user && user.tasks.map((task, index) =>
										<Paper
											className={this.state.selectedTasks.includes(task) ? 'selected-task-paper' : 'task-paper'}
											key={index}
											zDepth={2}
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
											className={this.state.selectedTasks.includes(task._id) ? 'selected-task-paper' : 'task-paper'}
											key={task._id}
											zDepth={2}
											onClick={() => this.addToSelected(task._id)}
										>
											{task.title} <br /> <br />
											{task.description} <br />

										</Paper>
									)}
								</div>
								<div className='urgents'>
									{user && user.tasks.map((task) =>
										<Paper
											className={this.state.selectedTasks.includes(task._id) ? 'selected-task-paper' : 'task-paper'}
											key={task._id}
											zDepth={2}
											onClick={() => this.addToSelected(task._id)}
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