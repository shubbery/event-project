module.exports = (req, res, next) => {
    console.log(req.user);
    if (req.user === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}