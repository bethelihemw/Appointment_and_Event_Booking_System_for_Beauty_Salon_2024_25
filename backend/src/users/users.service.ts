import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOne(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }

    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.userModel.findOne({ username });
    }
}
