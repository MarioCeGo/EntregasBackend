import knex from 'knex';

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'ecommerce'
    }
}
const myKnex = knex(options);
// try {
//     myKnex.schema.createTable('products', (table) => {
//         table.increments('id').primary()
//         table.string('name')
//         table.string('description')
//         table.string('code')
//         table.string('thumbnail')
//         table.integer('price')
//         table.integer('stock')
//         table.date('date')
//     }).then(a => console.log({ a })).catch(e => console.log({ e }))
// } catch (error) {

// }

export default myKnex