import { SignUpController } from "./signup";

describe('SignUp Controller', () => {
    test('Should return 400 if no name is provided', () => {
        const sut = new SignUpController()
        const httpRequest = {
            email: 'any_email@mail.com',
            password: 'any_passworld',
            passwordConfirmation: 'any_passworld'
        }
        sut.handle(httpRequest)

        const httpResponse = sut.handle(httpRequest)

        expect(httpResponse.statusCode).toBe(400)
    })
})