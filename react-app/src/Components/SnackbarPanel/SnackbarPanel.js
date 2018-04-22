import React, { Component, Fragment } from 'react'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SvgIconAdd from 'material-ui/svg-icons/content/add'
import SvgIconCreate from 'material-ui/svg-icons/file/create-new-folder'
import SvgIconRefresh from 'material-ui/svg-icons/navigation/refresh'
import SvgIconEdit from 'material-ui/svg-icons/image/edit'
import SvgIconDelete from 'material-ui/svg-icons/action/delete-forever'
import TaskManager from '../../model/TaskManager'
import Chip from 'material-ui/Chip'
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import { UserContext } from '../../contexts'
import './SnackbarPanel.css'

class SnackbarPanel extends Component {
	constructor(props) {
		super(props)
		this.payload = {}
		this.tm = new TaskManager()
		this.state = {
			isDialogOpened: false,
			actionType: '',
			selectedTasksFromTable: [],
			test: ''
		}
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		if (nextProps.selectedTasks.length !== prevState.selectedTasksFromTable.length) {
			return {
				selectedTasksFromTable: nextProps.selectedTasks
			}
		} else {
			return null
		}
	}






	openNewDialog = type => {
		this.setState({ actionType: type, isDialogOpened: true })
		if (type === 'create-group') {
			this.selectedTasksFromTable = this.props.selectedTasks.slice()
		}
	}

	closeDialog = () => {
		this.setState({ isDialogOpened: false })
		this.payload = {}
	}

	onSubmit = () => {
		switch (this.state.actionType) {
			case 'create-task':
				this.tm.handleCreateTask(this.payload, this.props.userUpdate)
				break
			case 'create-group':

				break
		}
		console.log(this.payload)
		this.setState({ isDialogOpened: false })
	}

	onTaskTitleChanged = e => {
		const input = e.target
		this.payload.taskTitle = input.value
		this.setState({ test: 'dfdf' })
	}

	onTaskDescriptionChanged = e => {
		const input = e.target
		this.payload.taskDescription = input.value
	}

	onGroupNameChanged = e => {
		const input = e.target
		this.payload.groupName = input.value
	}

	onWorkTimeChanged = e => {
		const input = e.target
		this.payload.taskWorkTime = input.value
	}

	onDeadlineChanged = (e, date) => {
		this.payload.taskDeadline = date
	}

	handleRowSelection = selectedRows => {
		console.log(selectedRows)
		if (selectedRows == 'all') {
			this.setState((prevState, props) => {
				return {
					selectedTasksFromTable: props.selectedTasks.slice()
				}
			})
		} else if (selectedRows == 'none') {
			this.setState((prevState, props) => {
				return {
					selectedTasksFromTable: []
				}
			})
		} else {
			this.setState((prevState, props) => {
				return {
					selectedTasksFromTable: selectedRows.map(id => {
						return props.selectedTasks[id]
					})
				}
			})
		}
	}

	isSelected = task => {

		return this.state.selectedTasksFromTable.includes(task)


	}

	testClick = e => {
		this.setState((prevState, props) => {
			return { test: 'ff' }
		}, () => console.log(this.state.test))
	}

	render() {
		const buttonStyle = { margin: 12 }
		// Cancel and Submit button
		const dialogActions = [
			<FlatButton label='Cancel' onClick={this.closeDialog} />,
			<RaisedButton label='Submit' primary={true} style={buttonStyle} onClick={this.onSubmit} />
		]
		let dialogControls = []
		let controlsDiv = <input />

		switch (this.state.actionType) {
			case 'create-group':
				controlsDiv =
					<div>
						<TextField
							hintText="Some group"
							floatingLabelText="Group name"
							onChange={this.onDeadlineChanged}
						/>

						<Table
							onRowSelection={this.handleRowSelection}
							height='200px'
							selectable={true}
							multiSelectable={true}
						>
							<TableHeader
								displaySelectAll={true}
								enableSelectAll={true}
							>
								<TableRow>
									<TableHeaderColumn>ID</TableHeaderColumn>
									<TableHeaderColumn>Task name</TableHeaderColumn>
									<TableHeaderColumn>Task description</TableHeaderColumn>
								</TableRow>
							</TableHeader>
							<TableBody
								showRowHover={true}
								stripedRows={false}
								deselectOnClickaway={false}
							>
								{this.props.selectedTasks.map((task, index) => {
									return (
										<TableRow selected={this.isSelected(task)} key={index}>
											<TableRowColumn>{index}</TableRowColumn>
											<TableRowColumn>{task.title}</TableRowColumn>
											<TableRowColumn>{task.description}</TableRowColumn>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</div>

				break
			case 'edit-group':
				break
			case 'add-to-group':
				break
			case 'create-task':
				controlsDiv =
					<div>
						<TextField
							hintText="Some task"
							floatingLabelText="Task name"
							onChange={this.onTaskTitleChanged}
						/><br />
						<TextField
							floatingLabelText="Task description"
							onChange={this.onTaskDescriptionChanged}
						/><br />
						<TextField
							floatingLabelText="Work time"
							onChange={this.onWorkTimeChanged}
						/><br />
						<DatePicker hintText="Deadline" onChange={this.onDeadlineChanged} />
					</div>
				break
			case 'edit-task':
				break
			default:
				break
		}




		return (
			<div className='chips-wrapper'>
				<Chip
					onClick={() => this.openNewDialog('create-task')}
					className='chip'
				>
					<Avatar color="#444" icon={<SvgIconAdd />} />
					Create Task
				</Chip>

				<Chip
					onClick={() => this.openNewDialog('create-group')}
					className='chip'
				>
					<Avatar color="#444" icon={<SvgIconCreate />} />
					Create Group
							</Chip>

				<Chip
					// onClick={this.tm.handleRefresh}
					className='chip'
				>
					<Avatar color="#444" icon={<SvgIconRefresh />} />
					Refresh Now
							</Chip>

				<Chip
					onClick={() => this.openNewDialog('edit-task')}
					className='chip'
				>
					<Avatar color="#444" icon={<SvgIconEdit />} />
					Edit task
							</Chip>

				<Chip
					onClick={() => this.openNewDialog('add-to-group')}
					className='chip'
				>
					<Avatar color="#444" icon={<SvgIconAdd />} />
					Add To Group
							</Chip>

				<Chip
					onClick={() => this.openNewDialog('edit-group')}
					className='chip'
				>
					<Avatar color="#444" icon={<SvgIconEdit />} />
					Edit Group
							</Chip>

				<Chip
					// onClick={this.tm.handleDeleteTask}
					backgroundColor='#D3162A'
					labelColor='#fff'
					className='chip'
				>
					<Avatar color="#fff" backgroundColor='#F4162A' icon={<SvgIconDelete />} />
					Delete Task
							</Chip>

				<Chip
					// onClick={this.tm.handleDeleteGroup}
					backgroundColor='#D3162A'
					labelColor='#fff'
					className='chip'
				>
					<Avatar color="#fff" backgroundColor='#F4162A' icon={<SvgIconDelete />} />
					Delete Group
				</Chip>

				{/* <SetupDialog action={this.state.actionType} /> */}

				<Dialog
					title={'ddd'}
					actions={dialogActions}
					modal={false}
					open={this.state.isDialogOpened}
					onRequestClose={this.closeDialog}
				>
					{controlsDiv}
				</Dialog>
			</div>
		)
	}
}

export default SnackbarPanel