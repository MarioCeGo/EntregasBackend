import express from "express";
import { engine } from 'express-handlebars';
import { Server as IOServer } from "socket.io";
import { Server as HttpServer} from "http";
import routerCart from "./routers/router.cart.js";
import routerProduct from "./routers/router.product.js";
import routerUser from "./routers/router.user.js";
import { MonogDB } from "./servers/mongoDB.js";
import * as admin from 'firebase-admin';


const PORT = process.env.PORT || 8080 ;
const app = express();
const { Router } = express();
const apiRouter = Router;

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



// const serviceAccount = require("./db/e-commerce-project-4c4b0-firebase-adminsdk-9ozbk-3a5d5b1fb8.json");

// admin.initializeApp({
//   credential: admin.credential.cert(("./db/e-commerce-project-4c4b0-firebase-adminsdk-9ozbk-3a5d5b1fb8.json"))
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.use('/api/products', routerProduct);
app.use('/api/cart', routerCart);
app.use('/api/user', routerUser);
app.all('*', (req, res) =>{res.send({"error": "Ruta no valida"})})

httpServer.listen(8080, ()=>{
    console.log(`Running in ${PORT}`);
});
MonogDB.init()
