const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const whitelist = ['http://localhost:3000', 'http://localhost:9000']
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}

const userRouter = require('./routes/user')
app.use('/user', cors(corsOptions), userRouter)

const fileRouter = require('./routes/file')
app.use('/file', cors(corsOptions), fileRouter)

app.listen(9000)
