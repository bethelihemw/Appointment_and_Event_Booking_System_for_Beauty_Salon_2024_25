import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'password', // Replace with your secret or use environment variables
        });
    }

    async validate(payload: any): Promise<User | null> {
        const user = await this.usersService.findOne(payload.username);
        if (!user) {
            return null;
        }
        return user; // The user object is added to the request object
    }
}
