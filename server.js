const { Console } = require('console');
const dotenv = require('dotenv');
const express = require('express');
const fs = require('fs')

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const originalClientIp = ip.split(',')[0].trim();
    saveToJSON(originalClientIp);
    return res.send(originalClientIp);
})

app.get('/get-ip', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.json({
        data: data
    })
})

app.listen(process.env.PORT || 3001, () => console.log('server is run'));

function saveToJSON(ipAddress) {
    const data = JSON.parse(fs.readFileSync('data.json'));
    const filter = data.filter(e => e.ipAddress === ipAddress)
    if(!filter.length > 0) {
        data.push({id: data.at(-1).id + 1 || 1, ipAddress: ipAddress})
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    }
}
