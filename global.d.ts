/// <reference types="jest" />
import supertest = require('supertest')

declare global {
    var request: supertest.SuperTest<supertest.Test>
}
