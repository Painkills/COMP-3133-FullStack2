var express = require("express")
var socket = require("socket.io")

var app = express()

var PORT = 8088

var server = app.listen(PORT, () => {
    console.log("Socket Server running at 8088")
})

// http://localhost:8088/
app.get("/", (req, res) => {
    res.sendFile( __dirname + "/index.html")
})

var io = socket(server)

users = [];
io.on('connection', (socket) => {
    console.log('A user has connected')
    socket.on('setUsername', (data) => {
        console.log(data)
        if(users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try another!')
        } else {
            users.push(data);
            socket.emit('userSet', {username: data})
        }
    })

    socket.on('msg', (data) => {
        // Send to all
        io.sockets.emit('newmsg', data)
    })
})

http.listen(3000, () => {
    console.log('listening on localhost: 3000')
})


// io.on("connection", (client) => {
//     console.log(`Client Connected: ${client.id}`)

//     client.emit("welcome", "Welcome to the Socket.io Chat Server")

//     client.on("hello", (data) => {
//         console.log(data)

//         const notice = {
//             status: false,
//             message: "Message to all"
//         }
    
//         client.broadcast.emit("notice", notice)
//     })

    

//     client.on("disconnect", () => {
//         console.log(`Client disconnected: ${client.id}`)
//     })
// })



