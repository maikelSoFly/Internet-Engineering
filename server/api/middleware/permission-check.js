exports.role = (roles) => {
    return (req, res, next) => {
        if (roles.every(role => req.user.roles.includes(role))) {
            next()
        } else {
            res.status(401).json({
                message: 'PERMISSION_DENIED'
            })
        }
    }
}


exports.task = () => {
    return (req, res, next) => {
        const taskID = req.params.taskID

        if (req.user.tasks.map(taskID => { return String(taskID) }).includes(taskID)) {
            next()
        } else {
            res.status(401).json({
                message: 'PERMISSION_DENIED'
            })
        }
    }
}


exports.group = () => {
    return (req, res, next) => {
        const groupID = req.params.groupID

        if (req.user.groups.map(groupID => { return String(groupID) }).includes(groupID)) {
            next()
        } else {
            res.status(401).json({
                message: 'PERMISSION_DENIED'
            })
        }
    }
}


exports.user = () => {
    return (req, res, next) => {
        const userID = req.params.userID

        if (req.user._id === userID) {
            next()
        } else {
            res.status(401).json({
                message: 'PERMISSION_DENIED'
            })
        }
    }
}