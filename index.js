const express = require('express');

const app = express();
const port = 3002;
const cors = require('cors');
const router = express.Router();

const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors());

app.get('/', (req, res) => {
    res.send('Login API')
});

app.listen(port, () =>{
    console.log(`This is login API with port = ${port}`)
} )
