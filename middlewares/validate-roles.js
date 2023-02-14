const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'user not found'
        });
    }
    const { role, username } = req.user;
    if (role !== 'ADMIN_ROLE') {
        return res.status(500).json({
            message: `${username} has a role which is not admin`
        });
    }
    next();
}
const hasRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: 'user not found'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(500).json({
                message: `Required these roles: ${roles}`
            });
        }
        next();
    }

}

module.exports = {
    isAdminRole,
    hasRole
}