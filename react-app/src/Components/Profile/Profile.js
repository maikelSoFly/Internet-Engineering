import React, { Component } from 'react'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
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

    }

    tm = new TaskManager()




    style = {
        height: 100,
        width: 100,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    }



    render() {
        return (
            <div className="container" >
                {this.props.user &&
                    <div>
                        <div className='chips-wrapper'>
                            <Chip
                                onClick={this.tm.handleCreateTask}
                                className='chip'
                            >
                                <Avatar color="#444" icon={<SvgIconAdd />} />
                                Create Task
                            </Chip>

                            <Chip
                                onClick={this.tm.handleCreateGroup}
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
                                onClick={this.tm.handleCreateTask}
                                className='chip'
                            >
                                <Avatar color="#444" icon={<SvgIconEdit />} />
                                Edit task
                            </Chip>

                            <Chip
                                onClick={this.tm.handleAddTaskToGroup}
                                className='chip'
                            >
                                <Avatar color="#444" icon={<SvgIconAdd />} />
                                Add To Group
                            </Chip>

                            <Chip
                                onClick={this.tm.handleCreateTask}
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
                                {this.props.user.tasks.map((task) =>

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
                                {this.props.user.tasks.map((task) =>

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
                                {this.props.user.tasks.map((task) =>

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
                    </div>}
            </div>
        )
    }
}

export default Profile