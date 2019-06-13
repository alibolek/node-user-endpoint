const axios = require("axios");
const fs = require("fs");
const BASE_ENDPOINT = 'https://reqres.in/api';
let pageNum = 1;

setInterval(async() => {
    const pageInfo = await axios.get(`${BASE_ENDPOINT}/users?page=${pageNum}`);

    fs.readFile('./cron/user.json', (err, data) => {
        const users = JSON.parse(data);

        console.log(`Writing user info on page: ${pageNum}`)

        fs.writeFile('./cron/user.json', JSON.stringify(users.concat(pageInfo.data.data)), (err) => {
            if (err) {
                console.log(err.message);
            } else {
                pageNum += 1;
            }

        });
    });
}, 1000 * 60);