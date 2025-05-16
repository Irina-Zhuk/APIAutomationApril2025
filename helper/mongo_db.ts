import {faker} from "@faker-js/faker";
import {User} from "../src/tests/interface";
import * as supertest from "supertest";
//import {Db, MongoClient} from "mongodb";
const request = supertest('http://localhost:8001/api/v1')
const {MongoClient, Db} = require('mongodb');



export function MongoDbConnection()  {
    let connection: typeof MongoClient
    let db : typeof Db
    beforeAll(async() => {
    try {
        connection = await MongoClient.connect(process.env.DATABASE_URL as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        db = await connection.db()
        console.log(process.env.DATABASE_URL, "connection");
    } catch (error) {
        console.error('error connecting to MongoDB', error)            ;
    }
})
    afterAll(async() => {
        await connection.close();
    })
}

