import dotenv from "dotenv";
dotenv.config({
    path : "./.env",
});

import { app } from "./app";
import  { WebSocketServer } from "ws";
import { run } from "./services/content-service";




const httpServer =  app.listen(3001);
const wss = new WebSocketServer({server : httpServer});

wss.on("connection", (ws) => {
    ws.on('error', (error)=>console.error(error));
    ws.send('Welcome You are now connected as AI!');
    
    ws.on("message",async (data, iSBinary) =>{
        const message = iSBinary ? data : data.toString();
        const prompt = String(message);
        const res = await run(prompt);
        ws.send(res);
    });

});