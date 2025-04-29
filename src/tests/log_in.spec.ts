import  * as supertest from "supertest";
import {deleteFunction, deleteFunction2, getUser, login, login2, signUp, signUp2} from "../../helper/user";
import {User} from "./interface";
const request = supertest('http://localhost:8001/api/v1/')

describe('USER SIGNUP AND LOGIN', () => {
    const user:User = getUser("admin")
    let cookie:string;
    describe('POSITIVE TESTING', () => {
     // ASYNC/WAIT + try and catch
        it('should login, signup and delete user', async () => {

            try {
                //Make the POST request/SignUp
                const res = await signUp(user)
                expect(res.statusCode).toBe(201)
                expect(res.body.data.user.email).toEqual(user.email)
                expect(res.body.status).toEqual("success")
                //login User
                const loginRes = await login(user)
                expect(loginRes.statusCode).toBe(200)
                expect(loginRes.body.status).toBe('success')
                cookie = loginRes.headers['set-cookie'][0].split('; ')[0]
                //delete user
                const deleteRes = await deleteFunction(cookie)
                expect(deleteRes.statusCode).toBe(200)
                expect(deleteRes.body.message).toBe('User deleted successfully')
                //login
                const loginAfterDeletion = await login2(user)
                expect(loginAfterDeletion.statusCode).toBe(401)
                expect(loginAfterDeletion.body.message).toBe('Incorrect email or password')

            } catch (error) {
                console.error('Error during Sigh Up');
                throw error; // Rethrow the error to fail the test
            }
        })
        it.only('should login, signup and delete user using .then',  () => {
           return signUp(user)
                .then((res) => {
                    console.log(res.body)
                    expect(res.statusCode).toBe(201)
                    expect(res.body.data.user.email).toEqual(user.email)
                    expect(res.body.status).toEqual("success")
                    return login(user)
                })
               .then((loginRes) => {
                    console.log(loginRes.body, 'loginRes')
                   expect(loginRes.statusCode).toBe(201)

                   expect(loginRes.body.status).toEqual("success")
                   console.log('cookie', loginRes.headers['set-cookie'][0])
                   cookie = loginRes.headers['set-cookie'][0].split('; ')[0]
                   return deleteFunction(cookie)
               })
               .then((deleteRes) => {
                   expect(deleteRes.statusCode).toBe(200)
                   expect(deleteRes.body.message).toBe('User deleted successfully')

                   return login(user)
               })
                .then((loginAfterDeletion) => {
                    expect(loginAfterDeletion.statusCode).toBe(401)
                    expect(loginAfterDeletion.body.message).toBe('Incorrect email or password')
                })
        })
        it.only('should login, signup and delete user using .end (done callback)',  (done) => {
            signUp2(user)
                .end((err,res) => {
                    if (err) return done(err)
                    console.log(res.body)
                    expect(res.statusCode).toBe(201)
                    expect(res.body.data.user.email).toEqual(user.email)
                    expect(res.body.status).toEqual("success")
                })
               login2(user)
                   .end((err,loginRes) => {
                       if (err) return done(err)
                       expect(loginRes.body.status).toEqual("success")
                       console.log('cookie', loginRes.headers['set-cookie'][0])
                       cookie = loginRes.headers['set-cookie'][0].split('; ')[0]
                   })
               deleteFunction2(cookie)
                   .end((err,deleteRes) => {
                       if (err) return done(err)
                       expect(deleteRes.statusCode).toBe(200)
                       expect(deleteRes.body.message).toBe('User deleted successfully')
                   }

                .then((loginRes) => {
                    console.log(loginRes.body, 'loginRes')
                    expect(loginRes.statusCode).toBe(201)

                    expect(loginRes.body.status).toEqual("success")
                    console.log('cookie', loginRes.headers['set-cookie'][0])
                    cookie = loginRes.headers['set-cookie'][0].split('; ')[0]
                    return deleteFunction(cookie)
                })
                .then((deleteRes) => {
                    expect(deleteRes.statusCode).toBe(200)
                    expect(deleteRes.body.message).toBe('User deleted successfully')

                    return login(user)
                })
                .then((loginAfterDeletion) => {
                    expect(loginAfterDeletion.statusCode).toBe(401)
                    expect(loginAfterDeletion.body.message).toBe('Incorrect email or password')
                })
        })
    })
})