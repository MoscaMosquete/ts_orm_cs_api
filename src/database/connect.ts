//  import { createConnection } from "typeorm"
//  createConnection().then(() => console.log("banco de dados conectado")).catch((err) => console.log(`NÃO conectou no banco de dados: + ${err}`))

import {createConnection} from 'typeorm';
export async function setup() {

 //console.log(__dirname);
 await createConnection().then(() => console.log('Connectou no Banco de dados!!')).catch((err) => console.log(`NÃO conectou no banco de dados: + ${err}`))
}