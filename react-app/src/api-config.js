let apiConfig = {
    address: 'http://localhost:5000',
    routes: {
        login: '/login/',
        register: '/signup/',
        user: '/user/',
        tasks: '/tasks/',
        groups: '/groups/',
        addTasksToGroup: '/groups/add-tasks/',
        removeTasksFromGroup: '/groups/remove-tasks/'
    },

    getRoute: function (property) {
        if (this.routes.hasOwnProperty(property)) {
            return this.address + this.routes[property]
        }

        throw new Error('UNRECOGNISED_ROUTE')
    },

    getRouteWithID: function (property, id) {
        if (this.routes.hasOwnProperty(property)) {
            return this.address + this.routes[property] + id
        }

        throw new Error('UNRECOGNISED_ROUTE')
    }
}

export default apiConfig