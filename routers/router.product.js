import express from 'express';
import adminCheck from '../middlewares/adminCheck.js';
import sistem from '../models/sistem.js';

const { Router } = express;
const routerProduct = Router();

routerProduct.get('/:id', async (req, res) => {
    const { id } = req.params;
    const listProduct = await sistem.getProducts();
    const aux = listProduct.find(elem => elem.id == id);
    res.send(aux ? aux : listProduct);

});
routerProduct.post('/', adminCheck, async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    const date = new Date().toLocaleString();
    const msg = await sistem.setProduct({ name, description, code, thumbnail, price, stock, date });
    res.send(msg);
});
routerProduct.put('/:id', adminCheck, async (req, res) => {
    const { name, description, code, thumbnail, price, stock } = req.body;
    const msg = await sistem.editProductById(req.params.id, { name, description, code, thumbnail, price, stock });
    res.send(msg);
});

routerProduct.delete('/:id', adminCheck, async (req, res) => {
    const {id} = req.params;
    const listProduct = await sistem.getProducts();
    const msg = await sistem.deleteProduct(id);
    res.send(msg);
});

export default routerProduct