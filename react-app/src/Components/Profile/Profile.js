import React, { Component, Fragment } from 'react'
import './Profile.css'
import Paper from 'material-ui/Paper'
import SnackbarPanel from '../SnackbarPanel/SnackbarPanel'
import { UserContext } from '../../contexts'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import SvgIconClear from 'material-ui/svg-icons/content/clear'
import update from 'immutability-helper';
import Badge from 'material-ui/Badge';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TaskManager from '../../model/TaskManager'



class Profile extends Component {


	constructor(props) {
		super(props)
		this.state = {
			selectedTasks: [],
			tasksGroups: {}
		}
		this.tm = new TaskManager()
	}



	componentDidMount() {
		this.getTaskDictionaryFromUserGroups()
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.user !== this.props.user) {
			this.getTaskDictionaryFromUserGroups()
		}
	}

	getTaskDictionaryFromUserGroups = () => {
		return new Promise((resolve, reject) => {
			const tasksGroups = {}

			if (this.props.user) {
				const groups = this.props.user.groups
				for (const group of groups) {
					for (const task of group.tasks) {
						const groupObj = { groupID: group._id, groupName: group.name }
						tasksGroups[task] = groupObj
					}
				}
			}
			resolve(tasksGroups)
		})
			.then(dict => {
				this.setState({ tasksGroups: dict }, () => {
					// console.log(this.state.tasksGroups)
				})
			})
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

	parseISOString = (s) => {
		var b = s.split(/\D+/);

		return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
			.toLocaleString();
	}

	hashCode = (str) => {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		return hash;
	}

	getGroupLabelStyle = (i) => {
		var c = (i & 0x00FFFFFF)
			.toString(16)
			.toUpperCase();

		return {
			background: "#" + "00000".substring(0, 6 - c.length) + c,
			height: '100%',
			width: '100%',
			justifyContent: 'center',
			alignItems: 'center',
			display: 'flex',
		}
	}

	removeTaskFromGroup = (task) => {
		const payload = {
			tasksIDs: [task._id],
			group: this.state.tasksGroups[task._id]
		}
		this.tm.handleRemoveTasksFromGroup(payload, this.props.userUpdate)
	}

	removeGroup = (groupID) => {
		const payload = {
			groupID: groupID
		}
		this.tm.handleDeleteGroup(payload, this.props.userUpdate)
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
								tasksGroups={this.state.tasksGroups}
								selectedTasks={this.state.selectedTasks} />

							<div className='top-shadow'></div>
							<div className='tasks-wrapper'>

								<div className='urgents'>
									{user && user.tasks.filter(task => task.tier === 'URGENTS').map((task) =>

										<Paper
											className={this.state.selectedTasks.includes(task) ?
												'selected-task-paper' :
												'task-paper'}
											key={task._id}
											zDepth={this.state.selectedTasks.includes(task) ? 5 : 2}
											onClick={() => this.addToSelected(task)}
										>
											<div className='tile-content'>
												<div className='tile-info-label '>Task title</div>
												<div className='tile-oneline'>{task.title}</div>
												<div className='tile-info-label '>Task description</div>
												<div className='tile-twoline'>{task.description}</div>
												<div className='tile-info-label '>Task deadline</div>
												<div className='tile-oneline'>{this.parseISOString(task.deadline)}</div>
											</div>

											{this.state.tasksGroups.hasOwnProperty(task._id) &&
												<div className='group-label'>
													<div style={this.getGroupLabelStyle(this.hashCode(this.state.tasksGroups[task._id].groupID))}>
														<div style={{ alignSelf: 'center' }}>{this.state.tasksGroups[task._id].groupName}</div>
														<IconMenu
															style={{
																position: 'absolute',
																right: '-10px', top: '0',
															}}
															onClick={event => event.stopPropagation()}
															iconStyle={{ color: 'white' }}
															iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
															anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
															targetOrigin={{ horizontal: 'left', vertical: 'top' }}
														>
															<MenuItem primaryText="Remove from group"
																onClick={() => this.removeTaskFromGroup(task)} />
															<MenuItem primaryText="Move to another group" />
															<MenuItem primaryText="Remove this group"
																onClick={() => this.removeGroup(this.state.tasksGroups[task._id].groupID)} />
														</IconMenu>
													</div>
												</div>
											}
										</Paper>
									)}
								</div>


								<div className='moderates'>
									{user && user.tasks.filter(task => task.tier === 'MODERATES').map((task) =>

										<Paper
											className={this.state.selectedTasks.includes(task) ?
												'selected-task-paper' :
												'task-paper'}
											key={task._id}
											zDepth={this.state.selectedTasks.includes(task) ? 5 : 2}
											onClick={() => this.addToSelected(task)}
										>
											<div className='tile-content'>
												<div className='tile-info-label '>Task title</div>
												<div className='tile-oneline'>{task.title}</div>
												<div className='tile-info-label '>Task description</div>
												<div className='tile-twoline'>{task.description}</div>
												<div className='tile-info-label '>Task deadline</div>
												<div className='tile-oneline'>{this.parseISOString(task.deadline)}</div>
											</div>

											{this.state.tasksGroups.hasOwnProperty(task._id) &&
												<div className='group-label'>
													<div style={this.getGroupLabelStyle(this.hashCode(this.state.tasksGroups[task._id].groupID))}>
														<div style={{ alignSelf: 'center' }}>{this.state.tasksGroups[task._id].groupName}</div>
														<IconMenu
															style={{
																position: 'absolute',
																right: '-10px', top: '0',
															}}
															onClick={event => event.stopPropagation()}
															iconStyle={{ color: 'white' }}
															iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
															anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
															targetOrigin={{ horizontal: 'left', vertical: 'top' }}
														>
															<MenuItem primaryText="Remove from group"
																onClick={() => this.removeTaskFromGroup(task)} />
															<MenuItem primaryText="Move to another group" />
															<MenuItem primaryText="Remove this group"
																onClick={() => this.removeGroup(this.state.tasksGroups[task._id].groupID)} />
														</IconMenu>
													</div>
												</div>
											}
										</Paper>
									)}
								</div>
								<div className='optionals'>
									{user && user.tasks.filter(task => task.tier === 'OPTIONALS').map((task) =>

										<Paper
											className={this.state.selectedTasks.includes(task) ?
												'selected-task-paper' :
												'task-paper'}
											key={task._id}
											zDepth={this.state.selectedTasks.includes(task) ? 5 : 2}
											onClick={() => this.addToSelected(task)}
										>
											<div className='tile-content'>
												<div className='tile-info-label '>Task title</div>
												<div className='tile-oneline'>{task.title}</div>
												<div className='tile-info-label '>Task description</div>
												<div className='tile-twoline'>{task.description}</div>
												<div className='tile-info-label '>Task deadline</div>
												<div className='tile-oneline'>{this.parseISOString(task.deadline)}</div>
											</div>

											{this.state.tasksGroups.hasOwnProperty(task._id) &&
												<div className='group-label'>
													<div style={this.getGroupLabelStyle(this.hashCode(this.state.tasksGroups[task._id].groupID))}>
														<div style={{ alignSelf: 'center' }}>{this.state.tasksGroups[task._id].groupName}</div>
														<IconMenu
															style={{
																position: 'absolute',
																right: '-10px', top: '0',
															}}
															onClick={event => event.stopPropagation()}
															iconStyle={{ color: 'white' }}
															iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
															anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
															targetOrigin={{ horizontal: 'left', vertical: 'top' }}
														>
															<MenuItem primaryText="Remove from group"
																onClick={() => this.removeTaskFromGroup(task)} />
															<MenuItem primaryText="Move to another group" />
															<MenuItem primaryText="Remove this group"
																onClick={() => this.removeGroup(this.state.tasksGroups[task._id].groupID)} />
														</IconMenu>
													</div>
												</div>
											}
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