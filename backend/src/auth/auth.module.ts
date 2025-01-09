import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Create a separate UsersModule for user management
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // User management logic
    PassportModule,
    JwtModule.register({
      secret: 'mypassword', // Replace with a secure key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
