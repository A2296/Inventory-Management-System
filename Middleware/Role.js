//Authorization middleware to check if the user has the required role to access a specific route
const authorize = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Access denied. Please authenticate.' });
        }

        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Access denied. Not authorized to access this resource.' });
        }

        next();
    };
};

module.exports = { authorize }; // Export the authorize middleware for use in other parts of the application