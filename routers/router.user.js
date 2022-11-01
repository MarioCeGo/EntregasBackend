import express from "express";
import sistem from "../models/sistem.js";
import { SESSION_USER } from "../public/src/js/index.js";


const { Router } = express;
const routerUser = Router();

const verifyUser =0

routerUser.get('/login',  async (req, res) => {
    const {name, pin} = req.body;
    const listUsers = await sistem.getUser();
    SESSION_USER.pop();
    SESSION_USER.push(listUsers.find(elem => elem.name == name && elem.pin == pin));
    res.send({SESSION_USER})
});
routerUser.post('/signin', async (req, res) => {
    const {name, pin, isAdmin} = req.body;
    await sistem.setUser({name, pin, isAdmin});
    res.send(await sistem.getUser())
})

export default routerUser