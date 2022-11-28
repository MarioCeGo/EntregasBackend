import * as admin from 'firebase-admin';

class ContainerFirebase{
    constructor(){
        this.db = admin.firestore();
        this.query = db.collection('cart');
    }
    async getCart(id){
        const doc = this.query.doc(id);
        const cart = await doc.get();
        const resp = cart.data();
        return resp;
    }
    async addToCart(id, prod){
        try {
            const querySnapshot = await this.query.get();
            const carts = querySnapshot.docs;
            const resp = carts.data();
            resp.forEach(elem =>{
                elem.id == id ? elem.prods.push(prod) : {id: resp.length, prods: [prod]}
            })
        } catch (error) {
            
        }
    }
}

const firebaseDB = new ContainerFirebase();

export default firebaseDB