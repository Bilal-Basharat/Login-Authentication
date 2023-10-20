const express = require('express');

const app = express();
const port = 3002;
const cors = require('cors');

const bodyParser = require('body-parser')

app.use(bodyParser.json())

const userRouter = require('./routes/userRoute');

require('./utils/db')

app.use(cors());

app.use('/api', userRouter);

app.get('/', (req, res) => {
    res.send('Login API')
});

app.listen(port, () =>{
    console.log(`This is login API with port = ${port}`)
} )
