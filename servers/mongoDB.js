import mongoose from "mongoose";

const mongoURL = "mongodb+srv://admin:admin@cluster0.9dmwbiu.mongodb.net/?retryWrites=true&w=majority";
const mongoCollection = "ecommerce"


export const MonogDB = {
    init: async () => {
        try {
            mongoose.connect(mongoURL, {dbName: mongoCollection});
            console.log("Conexion exitosa")
        } catch (error) {
            console.log(error);
        }
    }
}