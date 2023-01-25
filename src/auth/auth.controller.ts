import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Tokens } from 'src/auth/types';
import { GetCurrentUser } from 'src/decorators';
import { AtGuard, RtGuard } from 'src/decorators/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}


    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signupLocal(dto);
    }

    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto: AuthDto): Promise<Tokens> {
        return this.authService.signinLocal(dto);
    }

    // @UseGuards(AtGuard)
    // @Post('logout')
    // @HttpCode(HttpStatus.OK)
    // logout(@GetCurrentUser('sub') userId:number) {

    // }

    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(@Req() req: Request) {
        const user = req.user;
        return this.authService.refreshTokens(user['sub'], user['refreshToken']);
    }
}
