let apiConfig = {
    address: 'http://localhost:5000',
    routes: {
        login: '/login/',
        register: '/signup/',
        user: '/user/',
        tasks: '/tasks/',
        groups: '/groups/'
    },

    getRoute: function (property) {
        if (this.routes.hasOwnProperty(property)) {
            return this.address + this.routes[property]
        }

        throw new Error('UNRECOGNISED_ROUTE')
    }
}

export default apiConfig