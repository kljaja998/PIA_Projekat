import { UserType } from "../enums/user-types";

export class User{
    username: String;
    password: String;
    firstname: String;
    lastname: String;
    email: String;
    type: UserType;
    profile_picture: String;
    city: String;
    country: String;
    properties: Array<Object>
    approved: Boolean;
}