import  * as supertest from "supertest";

const request = supertest('http://localhost:8001/api/v1/')

describe('User Signup', () => {
    describe('Positive Testing', () => {
        it('Should sign up a new user', async () => {
           const userData = {
                name: "John Doe",
                email: "john12@example.com",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
           }
           console.log(userData);

           const res = await request.post('users/signup').send(userData);

           console.log(res.body.message)
           console.log(res.body)
            expect (res.status).toBe(201);
            expect(res.body.status).toBe('success');

        })
    })
    describe('Negative Testing', () => {
        it('Should not sign up a new user with no email', async () => {
            const userData = {
                name: "John Doe",
                email: "",
                password: "mypassword123",
                passwordConfirm: "mypassword123"
            }
            console.log(userData);

            const res = await request.post('users/signup').send(userData);

            console.log(res.body.message)
            console.log(res.body)
            expect (res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('Missing required fields: email')
        })
        it('Should not sign up a new user with no matching passwords', async () => {
            const userData = {
                name: "John Doe",
                email: "john11@example.com",
                password: "mypassword123",
                passwordConfirm: "wrongmypassword123"
            }
            console.log(userData);

            const res = await request.post('users/signup').send(userData);

            console.log(res.body.message)
            console.log(res.body)
            expect (res.status).toBe(400);
            expect(res.body.status).toBe('fail');
            expect(res.body.message).toBe('User validation failed: passwordConfirm: Passwords are not the same!')
        })

    })
})