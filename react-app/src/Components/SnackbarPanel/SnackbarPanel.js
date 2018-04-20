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
import { UserContext } from '../../contexts'
import './SnackbarPanel.css'

class SnackbarPanel extends Component {
	state = {
		isDialogOpened: false,
		actionType: '',
	}

	payload = {}
	tm = new TaskManager()

	openNewDialog = type => {
		this.setState({ actionType: type, isDialogOpened: true })

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
		}
		console.log(this.payload)
		this.setState({ isDialogOpened: false })
	}

	onTaskTitleChanged = e => {
		const input = e.target
		this.payload.taskTitle = input.value
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

	render() {
		const buttonStyle = { margin: 12 }
		// Cancel and Submit button
		const dialogActions = [
			<FlatButton label='Cancel' onClick={this.closeDialog} />,
			<RaisedButton label='Submit' primary={true} style={buttonStyle} onClick={this.onSubmit} />
		]
		let dialogControls = []

		const SetupDialog = ({ action: _action }) => {
			let controlsDiv = null

			switch (_action) {
				case 'create-group':
					controlsDiv =
						<TextField
							hintText="Some group"
							floatingLabelText="Group name"
							onChange={this.onDeadlineChanged}
						/>
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
				<Dialog
					title={'ddd'}
					actions={dialogActions}
					modal={false}
					open={this.state.isDialogOpened}
					onRequestClose={this.closeDialog}
				>
					{controlsDiv}
				</Dialog>
			)
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

				<SetupDialog action={this.state.actionType} />


			</div>




		)
	}
}

export default SnackbarPanel