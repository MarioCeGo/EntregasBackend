import {Schema} from 'mongoose';

const nameCollection = "products";

const Product = new Schema({
    name: {type: String, required: true, max: 50},
    description: {type: String, required: true, max: 200},
    code: {type: String, required: true, max: 50},
    thumbnail: {type: String, required: true, max: 300},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    timeStamp: {type: String, required: true, max: 20},
},{
    virtuals: true
}
);

Product.set("toJSON", {
    transform: (_, resp) =>{
        resp.id = resp._id;
        delete resp._id;
        return resp;
    }
});

export const ProductModel = {nameCollection, Product}