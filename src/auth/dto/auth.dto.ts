import { IsEmail, isEmail, IsNotEmpty, isNotEmpty, IsString } from "class-validator"

export class AuthDto {
    
    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()    
    password: string;
}

