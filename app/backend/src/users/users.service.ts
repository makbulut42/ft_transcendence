import { Injectable } from '@nestjs/common';
import { authenticator } from 'otplib';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private readonly users = [
        {
            userId: 1,
            email:'mehmeterenakbulut@outlook.com',
            username: 'makbulut',
            password: 'password',
            twoFactorAuthenticationSecret: null,
            isTwoFactorAuthenticationEnabled: false
        },
        {
            userId: 2,
            email:'samimozcan@outlook.com',
            username: 'saozcan',
            password: 'password',
            twoFactorAuthenticationSecret: null,
            isTwoFactorAuthenticationEnabled: false

        }
    ];

    async   findOne(email: string): Promise<User | undefined>{
        return this.users.find(user => user.email == email);
    }


    async   setTwoFactorAuthenticationSecret(secret: string, userId: number) {
        this.users.find(user => user.userId == userId).twoFactorAuthenticationSecret = secret;
    }

    isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User) {
        return authenticator.verify({
            token: twoFactorAuthenticationCode,
            secret: user.twoFactorAuthenticationSecret
        });
    }

    turnOnTwoFactorAuthentication(userId: number) {
        this.users.find(user => user.userId === userId).isTwoFactorAuthenticationEnabled = true;
    }
}