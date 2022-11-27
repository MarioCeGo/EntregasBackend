import containerMongoDB from "../container/containerMongoDB.js";
import { ProductModel } from "../models/product.js";


export class ProductsMongo extends containerMongoDB{
    constructor(){
        super({
            name: ProductModel.nameCollection,
            schema: ProductModel.Product
        })
    }
}