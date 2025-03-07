const userService = require('../services/user');

exports.getUser = async (req, res, next) => {
    try {
        res.send(await userService.getById(req.params.id));
    } catch (e) {
        next(e);
    }
};

exports.updateUser = async (req, res, next) => {    
    try {
        await userService.update(req.params.id, req.body);
        res.send({ message: 'User updated successfully' });
    } catch (e) {
        next(e);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await userService.deleteAccount(req.params.id);
        res.send({ message: 'User has been deleted' });
    } catch (e) {
        next(e);
    }
}