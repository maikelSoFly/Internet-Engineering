import React, { Component } from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import SvgIconAdd from 'material-ui/svg-icons/content/add'
import SvgIconCreate from 'material-ui/svg-icons/file/create-new-folder'
import SvgIconRefresh from 'material-ui/svg-icons/navigation/refresh'
import SvgIconEdit from 'material-ui/svg-icons/image/edit'
import SvgIconDelete from 'material-ui/svg-icons/action/delete-forever'
import TaskManager from '../../model/TaskManager'
import './Profile.css'
import Paper from 'material-ui/Paper'



class Profile extends Component {
    state = {
        actionDialogOpened: false,
        actionType: '',
        submitButtonEnabled: false,
        taskDetails: {},
        groupDetails: {},
        addToGroupDetails: {}
    }


    tm = new TaskManager()

    handleOpenActionDialog = (actionType) => {
        this.setState({
            actionDialogOpened: true,
            actionType: actionType
        })
    }

    ActionDialog = ({ action: _action }) => {
        const handleClose = () => {
            this.setState({ actionDialogOpened: false })
        }

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={handleClose}
            />
        ]

        const setDialog = (opts) => {
            actions.push(
                <FlatButton
                    label="Submit"
                    primary={true}
                    disabled={!this.state.submitButtonEnabled}
                    onClick={opts.submitFunc}
                />
            )

            return <Dialog
                title={opts.title}
                actions={actions}
                modal={false}
                open={this.state.actionDialogOpened}
                onRequestClose={handleClose}
            >
                [opts.children]
                {opts.children}
            </Dialog>
        }

        if (_action === 'CREATE_TASK') {
            return setDialog({
                title: 'Create a new task',
                submitFunc: () => this.tm.handleCreateTask(this.state.taskDetails),
            })

        } else if (_action === 'CREATE_GROUP') {
            return setDialog({
                title: 'Create a new group',
                submitFunc: () => this.tm.handleCreateGroup(this.state.groupDetails),
            })

        } else if (_action === 'ADD_TO_GROUP') {
            return setDialog({
                title: 'Add tasks to group',
                submitFunc: () => this.tm.handleAddTaskToGroup(this.state.addToGroupDetails),
            })

        } else if (_action === 'EDIT_TASK') {
            return setDialog({
                title: 'Edit the task',
                submitFunc: () => this.tm.handleEditTask(this.state.taskDetails),
            })

        } else if (_action === 'EDIT_GROUP') {
            return setDialog({
                title: 'Edit the group',
                submitFunc: () => this.tm.handleEditGroup(this.state.groupDetails),
            })

        }
        else {
            return <div></div>
        }
    }


    render() {
        const user = this.props.user

        return (
            <div className="container" >
                <div className='chips-wrapper'>
                    <Chip
                        onClick={() => this.handleOpenActionDialog('CREATE_TASK')}
                        className='chip'
                    >
                        <Avatar color="#444" icon={<SvgIconAdd />} />
                        Create Task
                            </Chip>

                    <Chip
                        onClick={() => this.handleOpenActionDialog('CREATE_GROUP')}
                        className='chip'
                    >
                        <Avatar color="#444" icon={<SvgIconCreate />} />
                        Create Group
                            </Chip>

                    <Chip
                        onClick={this.tm.handleRefresh}
                        className='chip'
                    >
                        <Avatar color="#444" icon={<SvgIconRefresh />} />
                        Refresh Now
                            </Chip>

                    <Chip
                        onClick={() => this.handleOpenActionDialog('EDIT_TASK')}
                        className='chip'
                    >
                        <Avatar color="#444" icon={<SvgIconEdit />} />
                        Edit task
                            </Chip>

                    <Chip
                        onClick={() => this.handleOpenActionDialog('ADD_TO_GROUP')}
                        className='chip'
                    >
                        <Avatar color="#444" icon={<SvgIconAdd />} />
                        Add To Group
                            </Chip>

                    <Chip
                        onClick={() => this.handleOpenActionDialog('EDIT_GROUP')}
                        className='chip'
                    >
                        <Avatar color="#444" icon={<SvgIconEdit />} />
                        Edit Group
                            </Chip>

                    <Chip
                        onClick={this.tm.handleDeleteTask}
                        backgroundColor='#D3162A'
                        labelColor='#fff'
                        className='chip'
                    >
                        <Avatar color="#fff" backgroundColor='#F4162A' icon={<SvgIconDelete />} />
                        Delete Task
                            </Chip>

                    <Chip
                        onClick={this.tm.handleDeleteGroup}
                        backgroundColor='#D3162A'
                        labelColor='#fff'
                        className='chip'
                    >
                        <Avatar color="#fff" backgroundColor='#F4162A' icon={<SvgIconDelete />} />
                        Delete Group
                            </Chip>
                </div>


                <div className='tasks-wrapper'>
                    <div className='optionals'>
                        {user && user.tasks.map((task) =>

                            <Paper
                                className='task-paper'
                                key={task._id}
                                zDepth={2}
                            >
                                {task.title}
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
                                {task.title}
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
                                {task.title}
                            </Paper>

                        )}
                    </div>
                </div>

                <this.ActionDialog action={this.state.actionType} />

            </div>
        )
    }
}

export default Profile