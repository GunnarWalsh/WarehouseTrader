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

const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

io.on("connection", socket => {
    console.log('socket id: ' + socket.id);
    
    // We add our additional event listeners right inside this function
    // NOTE: "connection" is a BUILT IN events listener
    socket.on('disconnect' , () =>{
        console.log('User Disconnected')
    })
});