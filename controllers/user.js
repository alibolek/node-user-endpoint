const axios = require('axios');
const fs = require('fs');
const utils = require('../utils');
const BASE_ENDPOINT = 'https://reqres.in/api';
const visitedUserList = [];

exports.getUserInfo = async(req, res) => {
    const { userId } = req.params;

    try {
        const response = await axios.get(`${BASE_ENDPOINT}/users/${userId}`);

        res.send(response.data.data);
    } catch (error) {
        res.send(error);
    }
};

exports.getAvatar = async(req, res) => {
    const { userId } = req.params;

    console.log(visitedUserList);

    if (visitedUserList.indexOf(userId) > -1) {
        return fs.readFile(utils.getUserAvatarPath(userId), (err, data) => {
            if (err) {
                return res.send(err.message);
            }

            return res.send(data);
        });
    }

    try {
        const response = await axios.get(`${BASE_ENDPOINT}/users/${userId}`);
        const userAvatar = await axios.get(response.data.data.avatar);
        const userAvatarBase64 = new Buffer(userAvatar.data, 'binary').toString('base64');

        fs.writeFile(utils.getUserAvatarPath(userId), userAvatarBase64, (err, data) => {
            visitedUserList.push(userId);

            res.send(userAvatarBase64);
        })

    } catch (error) {
        res.send(error);
    }
};

exports.deleteAvatar = async(req, res) => {
    const { userId } = req.params;

    if (visitedUserList.indexOf(userId) > -1) {
        visitedUserList.splice(visitedUserList.indexOf(userId), 1);

        return fs.unlink(utils.getUserAvatarPath(userId), (err, data) => {
            if (err) {
                return res.send(err.message);
            }

            return res.send(data);
        });
    }

    res.send();
}