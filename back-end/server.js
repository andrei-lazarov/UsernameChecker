import express from 'express';
import cors from 'cors';
import * as global from './global.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/request', (req, res) => {
    const usernameInput = req.body.usernameInput;
    console.log(`Received username: ${usernameInput}`);
    global.check(usernameInput).then((result) => {
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
