import  * as supertest from "supertest";
import { faker } from '@faker-js/faker';

const request = supertest('http://localhost:8001/api/v1/')

interface UserData {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;

}

describe('User Signup', () => {
    describe('Positive Testing with async/await', () => {
        it('Should sign up a new user with', async () => {
           const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234"
           }
           console.log(userData);

           try {
               //Make the POST request
               const res = await request.post('users/signup').send(userData).expect(201);
               //log the response
               console.log(res.body);
               //validate response body
               expect(res.body.status).toBe("success");
               expect(res.body.data.user.name).toBe(userData.name);
               expect(typeof res.body.data.user.name).toBe("string");
               expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
               expect(typeof res.body.data.user.email).toBe("string");
               expect(res.body.token).toBeDefined();
               expect(typeof res.body.token).toBe("string");

               // Additional checks for user object
               expect(res.body.data.user).toHaveProperty("_id");
               expect(res.body.data.user).not.toHaveProperty("password");

           } catch (error) {
               console.error('Error during Sigh Up');
               throw error; // Rethrow the error to fail the test
           }
        })
    })

    describe('Positive Testing with .then', () => {
        it('Should sign up a new user', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234"
            }
            console.log(userData);

            // Make the POST request using .then

            return request
                .post('users/signup')
                .send(userData)
                .expect(201)
                .then((res) => {
                    expect(res.body.status).toBe("success");
                    expect(res.body.data.user.name).toBe(userData.name);
                    expect(typeof res.body.data.user.name).toBe("string");
                    expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                    expect(typeof res.body.data.user.email).toBe("string");
                    expect(res.body.token).toBeDefined();
                    expect(typeof res.body.token).toBe("string");

                    // Additional checks for user object
                    expect(res.body.data.user).toHaveProperty("_id");
                    expect(res.body.data.user).not.toHaveProperty("password");
                })
                .catch ((error)=> {
                console.error('Error during Sigh Up', error);
                throw error; // Rethrow the error to fail the test
            })
        })
    })

    describe('Positive Testing with .end() and done()', () => {
        it('Should sign up a new', (done) => {
            const userData : UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "test1234",
                passwordConfirm: "test1234"
            }
            console.log(userData);
            request
                .post('users/signup')
                .send(userData)
                .expect(201)
                .end((err, res) => {
                    if(err){
                        console.error('Error during Sigh Up', err);
                        return done(err)
                    }
                    try {
                    expect(res.body.status).toBe("success");
                    expect(res.body.data.user.name).toBe(userData.name);
                    expect(typeof res.body.data.user.name).toBe("string");
                    expect(res.body.data.user.email).toBe(userData.email.toLowerCase());
                    expect(typeof res.body.data.user.email).toBe("string");
                    expect(res.body.token).toBeDefined();
                    expect(typeof res.body.token).toBe("string");

                    // Additional checks for user object
                    expect(res.body.data.user).toHaveProperty("_id");
                    expect(res.body.data.user).not.toHaveProperty("password");
                    done()
                }   catch (err)
                    {
                        console.error('Error during Sigh Up', err);
                        throw err; // Rethrow the error to fail the test
                    }
            })
        })
    })
    describe('Negative Testing with async/await', () => {
        it('Should not sign up a new user with no fields', async () => {
            const userData:UserData = {
                name: "",
                email: "",
                password: "",
                passwordConfirm: ""
            }
            console.log(userData);

            try {
                //Make the POST request
                const res = await request.post('users/signup').send(userData).expect(400);
                //log the response
                console.log(res.body);
                //validate response body
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Missing required fields: name, email, password, passwordConfirm");

            } catch (error) {
                console.error('Error during Sigh Up');
                throw error; // Rethrow the error to fail the test
            }
        })
        it('Should not sign up a new user with no matching passwords', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: "mypassword123",
                passwordConfirm: "wrongmypassword123"
            }
            console.log(userData);

            try {
                //Make the POST request
                const res = await request.post('users/signup').send(userData).expect(400);
                //log the response
                console.log(res.body);
                //validate response body
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("User validation failed: passwordConfirm: Passwords are not the same!");

            } catch (error) {
                console.error('Error during Sigh Up');
                throw error; // Rethrow the error to fail the test
            }
        })
        it('Should not sign up a new user with Password longer than 30 characters', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 31 }),
                passwordConfirm: faker.internet.password({ length: 31 }),
            }
            console.log(userData);

            try {
                //Make the POST request
                const res = await request.post('users/signup').send(userData).expect(400);
                //log the response
                console.log(res.body);
                //validate response body
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe("Password longer then 30 characters");

            } catch (error) {
                console.error('Error during Sigh Up');
                throw error; // Rethrow the error to fail the test
            }
        })
        it('Should not sign up a new user with Password shoter than 8 characters', async () => {
            const userData:UserData = {
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
                passwordConfirm: faker.internet.password({ length: 7 }),
            }
            console.log(userData);

            try {
                //Make the POST request
                const res = await request.post('users/signup').send(userData).expect(400);
                //log the response
                console.log(res.body);
                //validate response body
                expect(res.body.status).toBe("fail");
                expect(res.body.message).toBe(`User validation failed: password: Path \`password\` (\`${userData.password}\`) is shorter than the minimum allowed length (8)., passwordConfirm: Passwords are not the same!`);

            } catch (error) {
                console.error('Error during Sigh Up');
                throw error; // Rethrow the error to fail the test
            }
        })
    })

    describe('Negative Testing with .then', () => {
        it('Should not sign up a new user with no fields', async () => {
            const userData:UserData = {
                name: "",
                email: "",
                password: "",
                passwordConfirm: ""
            }
            console.log(userData);

            // Make the POST request using .then

            return request
                .post('users/signup')
                .send(userData)
                .expect(400)
                .then((res) => {
                    expect(res.body.status).toBe("fail");
                    expect(res.body.message).toBe("Missing required fields: name, email, password, passwordConfirm");

                })
                .catch ((error)=> {
                    console.error('Error during Sigh Up', error);
                    throw error; // Rethrow the error to fail the test
                })
        })
    })

    describe('Negative Testing', () => {
        it('Should not sign up a new when all field are missing  using .end() and done()', (done) => {
            const userData : UserData = {
                name: "",
                email: "",
                password: "",
                passwordConfirm: ""
            }
            console.log(userData);
            request
                .post('users/signup')
                .send(userData)
                .expect(400)
                .end((err, res) => {
                    if(err){
                        console.error('Error during Sigh Up', err);
                        return done(err)
                    }
                    try {
                        expect(res.body.status).toBe("fail");
                        expect(res.body.message).toBe("Missing required fields: name, email, password, passwordConfirm");
                        done()
                    }   catch (err)
                    {
                        console.error('Error during Sigh Up', err);
                        throw err; // Rethrow the error to fail the test
                    }
                })
        })
    })
})