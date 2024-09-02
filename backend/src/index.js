

import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./database/Db.js";
import mongoose from "mongoose";
import { Server } from 'socket.io';
import http from 'http';

// Load environment variables
dotenv.config({
    path: "./.env"
});

// Connect to MongoDB
mongoose.set('debug', true);
connectDB().then(() => {
    const port = process.env.PORT || 8000;

    // Create an HTTP server and integrate it with Express app
    const server = http.createServer(app);
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173", // Frontend URL
            methods: ["GET", "POST"]
        }
    });


  


      
    server.listen(port, () => {
        console.log(`Server listening at port ${port}`);
    });

    // Handle WebSocket connections
    io.on('connection', (socket) => {
        console.log('A user socket cosnnected');

        

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });


        socket.on("new_user_login", (data) => {
            io.emit("new_user_login", { message: data.message });
            console.log("backend sockets ran 2nd");
          });

          socket.on("new_user_register", (data) => {
            io.emit("new_user_register", { message: data.message });
            console.log("backend sockets ran for user registration");
        }); 

    });
}).catch((error) => console.log(error));
