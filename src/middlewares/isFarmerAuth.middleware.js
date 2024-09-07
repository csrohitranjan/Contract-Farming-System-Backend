export const isFarmerAuth = (req, res, next) => {

    const { role } = req.user;

    if (role === 'Farmer') {
        next(); // Role is Farmer, proceed to the next middleware
    } else {
        return res.status(403).json({
            status: 403,
            message: "Unauthorized Access: Farmer privileges required"
        })
    }
};