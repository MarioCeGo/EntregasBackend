import express from 'express';
import containerMongoDB from '../container/containerMongoDB.js';
import adminCheck from '../middlewares/adminCheck.js';
import sistem from '../models/sistem.js';
import { ProductDao } from '../daos/index.js';

const { Router } = express;
const routerProduct = Router();


routerProduct.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await ProductDao.getByID()
    res.send(product ? product : "No se encontro el producto");

});
routerProduct.post('/', async (req, res) => {
    const { name, description, code, thumbnail, price, stock, timeStamp } = req.body;
    const date = new Date();
    const msg = await ProductDao.save({ name, description, code, thumbnail, price, stock, timeStamp} )
    res.send(msg);
});
routerProduct.put('/:id', async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    ProductDao.updateByID(req.params.id, { name, description, code, thumbnail, price, stock })
    res.send({ok: true});
});

routerProduct.delete('/:id', async (req, res) => {
    const {id} = req.params;
    ProductDao.deleteByID(req.params.id);
    res.send({ok: true});
});

export default routerProduct