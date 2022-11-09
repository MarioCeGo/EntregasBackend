import knex from 'knex';

const options ={
    client: 'sqlite3',
    connection: {
        filename: './db/products.sqlite'
    },
    useNullAsDefault: true
}
const myKnexSQL = knex(options);

try {
    myKnexSQL.schema.createTable('products', (table) => {
        table.increments('id').primary()
        table.string('name')
        table.string('description')
        table.string('code')
        table.string('thumbnail')
        table.integer('price')
        table.integer('stock')
        table.date('date')
    }).then(a => console.log({ a })).catch(e => console.log({ e }))
} catch (error) {

}

export default myKnexSQL