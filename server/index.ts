

import http from 'http';
import express from 'express';
import 'dotenv/config'
import {Server, Socket} from 'socket.io';
import calcRouter from './routes/Calc';
import imgRouter from './routes/Img';
const cors = require('cors');
const socketIo = require('socket.io');
const PORT = process.env.PORT || 4444

const app = express();
app.use(express.json({limit: '2mb'}))
app.use(cors())
app.use(express.static('share'))

app.get('/', (req: express.Request, res: express.Response) => {
    //res.sendFile(__dirname+ '/index.html')
    res.header({contentType: 'application/json'})
    res.json({message: 'hello from server'})
});
app.use('/calc',calcRouter)
app.use('/img',imgRouter)
// const server = http.createServer(app);
// const io = new Server(server,{
//     cors:{
//         origin: 'http://127.0.0.1:3000'
//     }
// });

// socket.io
// io.on('connection',(socket: Socket) =>{
//     console.log(`client ${socket.id} connected !`);

//     socket.emit('FromApi',{message: 'hello from api'})


//     // handle disconnect
//     socket.on('disconnect',()=>{
//         console.log(`client ${socket.id} disconnected !`);
//     })
// });

app.listen(PORT, ()=>console.log(`server listening on port ${PORT}`));