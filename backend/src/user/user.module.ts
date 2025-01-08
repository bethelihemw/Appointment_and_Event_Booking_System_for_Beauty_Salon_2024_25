import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UsersController } from './user.controller';
import { UserSchema } from './schemas/user.schema'; 
import { AuthModule } from '../auth/auth.module';  

@Module({
  imports: [
    
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema }, 
    ]),
    AuthModule, 
  ],
  controllers: [UsersController],  
  providers: [UserService],  
})
export class UsersModule {}
