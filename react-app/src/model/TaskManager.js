import apiConfig from '../api-config'


class TaskManager {
    handleCreateTask = (details, callback) => {
        const payload = JSON.stringify({
            title: details.taskTitle,
            description: details.taskDescription,
            workTime: details.taskWorkTime,
            deadline: details.taskDeadline
        })

        fetch(apiConfig.getRoute('tasks'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: payload
        })
            .then(result => {
                if (!result.ok) {
                    throw new Error(result.statusText)
                }
                return result.json()
            })
            .then(jsonResult => {
                console.log(jsonResult)
                callback()
            })
            .catch(err => {
                console.error(err)
            })
    }

    handleRefresh = () => {

    }


    handleCreateGroup = details => {
        console.log('create group')
    }


    handleEditTask = details => {
        console.log('edit task')
    }


    handleEditGroup = details => {
        console.log('edit group')
    }


    handleAddTaskToGroup = details => {
        console.log('add tasks to group')
    }


    handleDeleteTask = event => {

    }


    handleDeleteGroup = event => {

    }


    handleRefresh = event => {

    }
}

export default TaskManager