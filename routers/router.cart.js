import express from 'express';
import firebaseDB from '../container/containerFirebase.js';
import sistem from '../models/sistem.js';
import { SESSION_USER } from '../public/src/js/index.js';

const { Router } = express;
const routerCart = Router();

routerCart.get('/:id/products', async (req, res) => {
    const id = req.params.id;
    id ? res.send(firebaseDB.getCart(id)) : res.send("ID no encontrado");
});

routerCart.post('/', async (req, res) => {
    const msg = await sistem.setCart(SESSION_USER[0].id);
    res.send(msg);
});

routerCart.post('/:id/:prod', async (req, res) => {
    const { name, description, code, thumbnail, price, stock} = req.body;
    const {id} = req.params;
    id ? firebaseDB.addToCart(id, { name, description, code, thumbnail, price, stock}) : res.send("ID no encontrado");
});

export default routerCart