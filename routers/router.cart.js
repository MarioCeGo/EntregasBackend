import express from 'express';
import sistem from '../models/sistem.js';
import { SESSION_USER } from '../public/src/js/index.js';

const { Router } = express;
const routerCart = Router();

routerCart.get('/:id/products', async (req, res) => {
    const cart = await sistem.getCartById(req.params.id);
    res.send(cart);
});

routerCart.post('/', async (req, res) => {
    const msg = await sistem.setCart(SESSION_USER[0].id);
    res.send(msg);
});

routerCart.post('/:id/products', async (req, res) => {
    const { name, description, code, thumbnail, price, stock, id } = req.body;
    const msg = await sistem.addToCart(req.params.id, { name, description, code, thumbnail, price, stock, id });
    res.send(msg);
});

routerCart.delete('/:id/products/:id_prod', async (req, res) => {
    const {id, id_prod} = req.params;
    const msg = await sistem.deleteProdToCard(id, id_prod);
    res.send(msg)
});

routerCart.delete('/:id', async (req, res) => {
    const msg = await sistem.deleteCart(req.params.id);
    res.send(msg);
});

export default routerCart