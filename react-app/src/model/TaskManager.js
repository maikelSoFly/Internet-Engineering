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
					throw Error(result.statusText)
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


	handleCreateGroup = (details, callback) => {
		const payload = JSON.stringify({
			name: details.groupName,
			tasksIDs: details.tasksIDs
		})
		fetch(apiConfig.getRoute('groups'), {
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


	handleEditTask = (details, callback) => {
		const payload = JSON.stringify(
			[
				{ propName: 'title', value: details.taskTitle },
				{ propName: 'description', value: details.taskDescription },
				{ propName: 'workTime', value: details.taskWorkTime },
				{ propName: 'deadline', value: details.taskDeadline }
			]
		)
		console.log(payload)
		fetch(apiConfig.getRouteWithID('tasks', details.taskID), {
			method: 'PATCH',
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


	handleEditGroup = details => {
		console.log('edit group')
	}


	handleAddTaskToGroup = (details, callback) => {
		const payload = JSON.stringify({
			tasksIDs: details.tasksIDs
		})

		fetch(apiConfig.getRouteWithID('addTasksToGroup', details.group._id), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: payload
		})
			.then(result => {
				if (!result.ok) {
					throw Error(result.statusText)
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

	handleRemoveTasksFromGroup = (details, callback) => {
		const payload = JSON.stringify({
			tasksIDs: details.tasksIDs
		})

		console.log(payload)

		fetch(apiConfig.getRouteWithID('removeTasksFromGroup', details.group.groupID), {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
			body: payload
		})
			.then(result => {
				if (!result.ok) {
					throw Error(result.statusText)
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


	handleDeleteTask = (details, callback) => {
		const tasks = []

		details.tasksIDs.forEach(task => {
			tasks.push(
				fetch(apiConfig.getRouteWithID('tasks', task._id), {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('token')
					},
				})
					.then(result => {
						if (!result.ok) {
							throw Error(result.statusText)
						}
						return result.json()
					})
					.then(jsonResult => {
						console.log(jsonResult)
					})
					.catch(err => {
						console.error(err)
					})
			)
		});

		Promise.all(tasks)
			.then(res => {
				callback()
			})
			.catch(err => {
				console.error(err)
			})
	}


	handleDeleteGroup = (details, callback) => {
		fetch(apiConfig.getRouteWithID('groups', details.groupID), {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('token')
			},
		})
			.then(result => {
				if (!result.ok) {
					throw Error(result.statusText)
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


	handleRefresh = event => {

	}
}

export default TaskManager