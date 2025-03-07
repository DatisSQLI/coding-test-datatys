const userService = require('../services/user');

exports.getUser = async (req, res) => {
    res.send(await userService.getById(req.params.id));
    // TODO : error handling
};

exports.updateUser = async (req, res) => {
    if (await userService.update(req.params.id, req.body)) {
        res.send({ message: 'User updated successfully' });
    }

    // TODO : error handling
};

exports.deleteUser = async (req, res) => {
    if (await userService.deleteAccount(req.params.id)) {
        res.send({});
    }

    // TODO : error handling
}