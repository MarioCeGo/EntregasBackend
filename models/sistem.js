import fs from 'fs';
import myKnex from '../servers/MariaDB.js';
import myKnexSQL from '../servers/SQLite3.js';

class Sistem {
    constructor() {
        this.products = "./data/products.txt";
        this.cart = "./data/cart.txt";
        this.users = "./data/users.txt"
    }

    async setProduct(prod) {
        try {
            try {
                const data = await this.getProducts();
                data.length === 0 ? prod.id = 1 : prod.id = data[data.length - 1].id + 1;
                data.push(prod);
                await fs.promises.writeFile(this.products, JSON.stringify(data));
                myKnex.from('products').insert({
                    name: prod.name,
                    description: prod.description,
                    code: prod.code,
                    thumbnail: prod.thumbnail,
                    price: prod.price,
                    stock: prod.stock,
                    date: prod.date
                }).then(a => console.log(a)).catch(e => console.log(e));
                myKnexSQL.from('products').insert({
                    name: prod.name,
                    description: prod.description,
                    code: prod.code,
                    thumbnail: prod.thumbnail,
                    price: prod.price,
                    stock: prod.stock,
                    date: prod.date
                }).then(a => console.log(a)).catch(e => console.log(e));
                return {saved: true};
            } catch (error) {
                prod.id = 1
                await fs.promises.writeFile(this.products, JSON.stringify([prod]));
                myKnex.from('products').insert({
                    name: prod.name,
                    description: prod.description,
                    code: prod.code,
                    thumbnail: prod.thumbnail,
                    price: prod.price,
                    stock: prod.stock,
                    date: prod.date
                }).then(a => console.log(a)).catch(e => console.log(e));
                myKnexSQL.from('products').insert({
                    name: prod.name,
                    description: prod.description,
                    code: prod.code,
                    thumbnail: prod.thumbnail,
                    price: prod.price,
                    stock: prod.stock,
                    date: prod.date
                }).then(a => console.log(a)).catch(e => console.log(e));
                return {saved: true};
            }
        } catch (error) {
            return {"error" : error};
        }
    }
    async setCart(id) {
        try {
            const data = await this.getCarts();
            data.push({"id": id, "prods":[]});
            await fs.promises.writeFile(this.cart, JSON.stringify(data));
            return {"created": true};
        } catch (error) {
            return {"error": `No se pudo crear el carrito ${error}`};
        }
    }
    async setUser(user) {
        try {
            try {
                const data = await this.getUser();
                data.length === 0 ? user.id = 1 : user.id = data[data.length - 1].id + 1;
                data.push(user);
                await fs.promises.writeFile(this.users, JSON.stringify(data));
                return {"created": true};
            } catch (error) {
                user.id = 1
                await fs.promises.writeFile(this.users, JSON.stringify([user]));
                return {"created": true};
            }
        } catch (error) {
            return {"error": `No se pudo crear el usuario ${error}`};
        }
    }

    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.products, 'utf-8');
            return await (data.length > 0 ? JSON.parse(data) : []);
        } catch (error) {
            return {"error":`No se pudo leer el archivo ${this.products}`};
        }
    }
    async getCarts() {
        try {
            const data = await fs.promises.readFile(this.cart, 'utf-8');
            return await (data.length > 0 ? JSON.parse(data) : []);
        } catch (error) {
            return {"error":`No se pudo leer el archivo ${this.cart}`};
        }
    }
    async getCartById(id){
        try {
            const data = await this.getCarts();
            const cart = data.find(elem => elem.id == id);
            return cart;
        } catch (error) {
            return {"error": `Carrito no encontrado ${error}`};
        }
    }
    async getUser() {
        try {
            const data = await fs.promises.readFile(this.users, 'utf-8');
            return await (data.length > 0 ? JSON.parse(data) : []);
        } catch (error) {
            return {"error":`No se pudo leer el archivo ${this.users}`};
        }
    }

    async editProductById(id, newProd) {
        try {
            const data = await this.getProducts();
            const oldProd = data.find(elem => elem.id == id);
            oldProd.name = newProd.name;
            oldProd.description = newProd.description;
            oldProd.code = newProd.code;
            oldProd.thumbnail = newProd.thumbnail;
            oldProd.price = newProd.price;
            oldProd.stock = newProd.stock;
            await fs.promises.writeFile(this.products, JSON.stringify(data));
            return {"edited": true};
        } catch (error) {
            return {"error":`Error al editar el producto: ${error}`};
        }
    }
    async addToCart(id, prod){
        try {
            const data = await this.getCarts();
            const cart = data.find(elem => elem.id == id);
            cart.prods.push(prod)
            await fs.promises.writeFile(this.cart, JSON.stringify(data));
            return {"aggregated": true}
        } catch (error) {
            return {"error": `Error al agregar el producto ${error}`}
        }
    }

    async deleteProduct(id) {
        try {
            const data = await this.getProducts();
            data.splice(data.indexOf(data.find(elem => elem.id == id)), 1)
            await fs.promises.writeFile(this.products, JSON.stringify(data));
            return {"deleted": true};
        } catch (error) {
            return {"error":`Error al eliminar el producto: ${error}`};
        }

    }
    async deleteCart(id){
        try {
            const data = await this.getCarts();
            data.splice(data.indexOf(data.find(elem => elem.id == id)), 1)
            await fs.promises.writeFile(this.cart, JSON.stringify(data));
            return {"deleted": true};
        } catch (error) {
            return {"error":`Error al eliminar el carrito: ${error}`};
        }
    }
    async deleteProdToCard(id, idProd){
        try {
            const data = await this.getCarts();
            const cart = data.find(elem => elem.id == id);
            cart.prods.splice(cart.prods.indexOf(cart.prods.find(elem => elem.id == idProd)), 1);
            await fs.promises.writeFile(this.cart, JSON.stringify(data));
            return {"deleted": true};
        } catch (error) {
            return {"error": `Error al eliminar el producto ${error}`};
        }
    }
}
const sistem = new Sistem();

export default sistem