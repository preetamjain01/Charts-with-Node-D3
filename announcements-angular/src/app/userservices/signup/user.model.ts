export class User {

  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public username: string,
    public password: string,
    public confirmPassword: string,
    public _id: any,
    public credits: number,
    public role: string
  ) {  }

}
