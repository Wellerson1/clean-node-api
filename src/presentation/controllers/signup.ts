import { InvalidParamError, MissingParamError, ServerError } from "../errors";
import { Controller } from "../protocols/controller";
import { badRequest, serverError } from "../helpers/http-helpers";
import { HttpRequest, HttpResponse, EmailValidator } from "../protocols/";
import { AddAccount } from "../../domain/use-cases/add-account";

export class SignUpController implements Controller {

    private readonly emailValidator: EmailValidator
    private readonly addAccount: AddAccount


    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAccount = addAccount
    }

    handle (httpRequest: HttpRequest): HttpResponse {
    try {    
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        
        for(const field of requiredFields) {
            if(!httpRequest.body[field]) {
            return badRequest(new MissingParamError(field))  
            }  
        }

        const isValid = this.emailValidator.isValid(httpRequest.body.email);

        const {name, email, password, passwordConfirmation} = httpRequest.body
       
        if (password !== passwordConfirmation ) {
            return badRequest(new InvalidParamError('passwordConfirmation')) 
        }

        if(!isValid) {
            return badRequest(new InvalidParamError('email')) 
        }

        this.addAccount.add({
            name,
            email,
            password
          })
          
    } catch(error) {
        return serverError()
}
}
}