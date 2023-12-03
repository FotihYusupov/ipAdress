const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip)
    return res.send(req.ip)
})

app.listen(process.env.PORT || 3001, () => console.log('server is run'));