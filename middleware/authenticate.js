const isAuthenticated = (req, res, next) => {
    if(req.session.user === undefined){
        return res.status(401).json("Access restriction! Please, login first.");
    }
    next();
}

module.exports = {
    isAuthenticated
}