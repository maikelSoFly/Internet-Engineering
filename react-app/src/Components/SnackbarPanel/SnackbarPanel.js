import React, { Component, Fragment } from 'react'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import DatePicker from 'material-ui/DatePicker'
import SvgIconAdd from 'material-ui/svg-icons/content/add'
import SvgIconClear from 'material-ui/svg-icons/content/clear'
import SvgIconCreate from 'material-ui/svg-icons/file/create-new-folder'
import SvgIconAddToGroup from 'material-ui/svg-icons/av/library-add'
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
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
      groupDropdownValue: 0,
      tierDropdownValue: 'OPTIONALS',
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
    if (type === 'edit-task' && this.props.selectedTasks.length !== 1) {
      return
    }
    else if (type === 'create-group') {
      if (this.props.selectedTasks.length < 2) {
        return
      }
      this.selectedTasksFromTable = this.props.selectedTasks.slice()
    }
    else if (type === 'add-to-group') {
      this.payload.group = this.props.user.groups[0]
    }
    this.setState({ actionType: type, isDialogOpened: true })

  }

  closeDialog = () => {
    this.setState({ isDialogOpened: false, actionType: '' })
    this.payload = {}
  }

  onSubmit = () => {

    switch (this.state.actionType) {
      case 'create-task':
        this.tm.handleCreateTask(this.payload, this.props.userUpdate)
        break
      case 'create-group':
        this.payload.tasksIDs = this.state.selectedTasksFromTable.map(task => {
          return task._id
        })
        this.tm.handleCreateGroup(this.payload, this.props.userUpdate)
        break
      case 'edit-task':
        this.payload.taskID = this.props.selectedTasks[0]._id
        this.tm.handleEditTask(this.payload, this.props.userUpdate)
        break
      case 'delete-task':
        this.payload.tasksIDs = this.props.selectedTasks
        this.tm.handleDeleteTask(this.payload, this.props.userUpdate)
        break
      case 'add-to-group':
        this.payload.tasksIDs = this.state.selectedTasksFromTable.map(task => {
          return task._id
        })
        this.tm.handleAddTaskToGroup(this.payload, this.props.userUpdate)

    }

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



  handleRowSelection = selectedRows => {
    if (selectedRows === 'all') {
      this.setState((prevState, props) => {
        return {
          selectedTasksFromTable: props.selectedTasks.slice()
        }
      })
    } else if (selectedRows === 'none') {
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


  onTierChanged = (event, index, value) => {
    this.setState({ tierDropdownValue: value })
    this.payload.tier = value
  }


  onGroupChanged = (event, index, value) => {
    this.setState({ groupDropdownValue: value })
    this.payload.group = this.props.user.groups[value]
  }



  render() {
    const buttonStyle = { margin: 12 }
    // Cancel and Submit button
    let dialogActions = [
      <FlatButton label='Cancel' onClick={this.closeDialog} />,
      <RaisedButton label='Ok' primary={true} style={buttonStyle} onClick={this.onSubmit} />
    ]

    let controlsDiv = null
    let dialogTitle = ''

    switch (this.state.actionType) {
      case 'create-group':
        dialogTitle = 'Create a group of tasks'
        controlsDiv =
          <div>
            <TextField
              hintText="Some group"
              floatingLabelText="Group name"
              onChange={this.onGroupNameChanged}
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
        if (this.props.selectedTasks.length === 0) {
          dialogTitle = 'Something went wrong!'
          dialogActions = [
            <RaisedButton label='Ok' primary={true} style={buttonStyle} onClick={this.closeDialog} />
          ]
          controlsDiv =
            <div>
              <p style={{ fontSize: '120%' }}>No tasks selected.</p>
              <p>Click on task's tile to select.</p>
            </div>
          break
        }
        dialogTitle = 'Add tasks to group'

        let groups = []


        this.props.user.groups.forEach((group, index) => {
          groups.push(<MenuItem value={index} key={index} primaryText={group.name} />)
        });


        controlsDiv =
          <div style={{ display: 'flex' }}>
            <div>
              <p style={{ marginBottom: '-10px' }}>Select a group:</p>
              <DropDownMenu
                maxHeight={300}
                value={this.state.groupDropdownValue}
                onChange={this.onGroupChanged}
                style={{ width: '200px' }}
                autoWidth={false}
              >
                {groups}
              </DropDownMenu>
            </div>
            <div>
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
          </div>

        break
      case 'delete-task':
        dialogTitle = 'Delete tasks'
        controlsDiv =
          <div>
            Do you want to delete {this.props.selectedTasks.length} tasks?
					</div>
        break

      case 'create-task':
        dialogTitle = 'Create a task'
        let tiers = []

        tiers = [<MenuItem value={'OPTIONALS'} key={0} primaryText={'Optional'} />,
        <MenuItem value={'MODERATES'} key={1} primaryText={'Moderate'} />,
        <MenuItem value={'URGENTS'} key={2} primaryText={'Urgent'} />
        ]

        controlsDiv =
          <div>
            <TextField
              hintText="Some task"
              floatingLabelText="Task name"
              onChange={this.onTaskTitleChanged}
            /> <br />
            <TextField
              floatingLabelText="Task description"
              onChange={this.onTaskDescriptionChanged}
            /><br />


            <DatePicker
              hintText="Deadline"
              onChange={this.onDeadlineChanged}
            />
            <p style={{ marginBottom: '-10px', color: '#B2B2B2', fontWeight: 'inherit' }}>Select a tier:</p>
            <DropDownMenu
              maxHeight={300}
              value={this.state.tierDropdownValue}
              onChange={this.onTierChanged}
              style={{ width: '200px' }}
              autoWidth={false}
            >
              {tiers}
            </DropDownMenu>
          </div>
        break
      case 'edit-task':
        dialogTitle = 'Edit task'
        controlsDiv =
          <div>
            <TextField
              floatingLabelText='Task title'
              defaultValue={this.props.selectedTasks[0].title}
              onChange={this.onTaskTitleChanged}
            /><br />
            <TextField
              floatingLabelText='Task description'
              defaultValue={this.props.selectedTasks[0].description}
              onChange={this.onTaskDescriptionChanged}
            /><br />
            <TextField
              floatingLabelText='Task worktime'
              defaultValue={this.props.selectedTasks[0].workTime}
              onChange={this.onWorkTimeChanged}
            /><br />
            <DatePicker
              hintText={this.props.selectedTasks[0].deadline}
              onChange={this.onDeadlineChanged} />
          </div>
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
          onClick={this.props.userUpdate}
          className='chip'
        >
          <Avatar color="#444" icon={<SvgIconRefresh />} />
          Refresh
							</Chip>

        {this.props.selectedTasks.length === 1 &&
          <Chip
            onClick={() => this.openNewDialog('edit-task')}
            className='chip'
          >
            <Avatar color="#444" icon={<SvgIconEdit />} />
            Edit task
          </Chip>
        }

        {this.props.selectedTasks.length > 1 &&
          <Chip
            onClick={() => this.openNewDialog('create-group')}
            className='chip'
          >
            <Avatar color="#444" icon={<SvgIconCreate />} />
            Create Group
							</Chip>
        }


        {this.props.selectedTasks.length > 0 &&
          <Fragment>

            <Chip
              onClick={() => this.openNewDialog('add-to-group')}
              className='chip'
            >
              <Avatar color="#444" icon={<SvgIconAddToGroup />} />
              Add To Group
            </Chip>
            <Chip
              onClick={() => this.openNewDialog('delete-task')}
              backgroundColor='#D3162A'
              labelColor='#fff'
              className='chip'
            >
              <Avatar color="#fff" backgroundColor='#F4162A' icon={<SvgIconDelete />} />
              {this.props.selectedTasks.length === 1 ? 'Delete Task' : 'Delete Tasks'}
            </Chip>

          </Fragment>

        }


        {/* <Chip
					// onClick={this.tm.handleDeleteGroup}
					backgroundColor='#D3162A'
					labelColor='#fff'
					className='chip'
				>
					<Avatar color="#fff" backgroundColor='#F4162A' icon={<SvgIconDelete />} />
					Delete Group
				</Chip> */}

        {/* <SetupDialog action={this.state.actionType} /> */}

        <Dialog
          title={dialogTitle}
          actions={dialogActions}
          modal={false}
          open={this.state.isDialogOpened}
          onRequestClose={this.closeDialog}
          autoScrollBodyContent={true}
        >
          {controlsDiv}
        </Dialog>
      </div>
    )
  }
}

export default SnackbarPanel