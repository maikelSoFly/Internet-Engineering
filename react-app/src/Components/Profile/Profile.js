import React, { Component, Fragment } from 'react'
import './Profile.css'
import Paper from 'material-ui/Paper'
import SnackbarPanel from '../SnackbarPanel/SnackbarPanel'
import { UserContext } from '../../contexts'



class Profile extends Component {
	state = {
	}


	render() {
		const user = this.props.user
		return (
			<Fragment>
				<UserContext.Consumer>
					{({ user, userUpdate }) => (
						<Fragment>
							<SnackbarPanel userUpdate={userUpdate} />

							<div className='tasks-wrapper'>
								<div className='optionals'>
									{user && user.tasks.map((task) =>
										<Paper
											className='task-paper'
											key={task._id}
											zDepth={2}
										>
											{task.title} <br /> <br />
											{task.description} <br />
										</Paper>
									)}

								</div>
								<div className='moderates'>
									{user && user.tasks.map((task) =>

										<Paper
											className='task-paper'
											key={task._id}
											zDepth={2}
										>
											{task.title} <br /> <br />
											{task.description} <br />

										</Paper>
									)}
								</div>
								<div className='urgents'>
									{user && user.tasks.map((task) =>
										<Paper
											className='task-paper'
											key={task._id}
											zDepth={2}
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