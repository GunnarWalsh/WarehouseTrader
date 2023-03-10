const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors')
const socket = require('socket.io')
const cookieParser = require('cookie-parser')

require("./config/mongoose.config");
require("dotenv").config();

app.use(cookieParser())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))
app.use(express.json(), express.urlencoded({ extended: true }));

const User = require('./models/user.model')
const Item = require('./models/item')
const userRoutes = require("./routes/user.routes");
const itemRoutes = require('./routes/item.routes')
userRoutes(app);
itemRoutes(app);

app.listen(port, () => console.log(`Listening on port: ${port}`) );