export const isBuyerAuth = (req, res, next) => {

    const { role } = req.user;

    if (role === 'Buyer') {
        next(); // Role is Buyer, proceed to the next middleware
    } else {
        return res.status(403).json({
            status: 403,
            message: "Unauthorized Access: Buyer privileges required"
        })
    }
};