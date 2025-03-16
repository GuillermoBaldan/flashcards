import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/users/entities/user.entity';
import { PasswordHelper } from 'src/helpers/password.helper';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const existingUser = await this.userModel
      .findOne({
        $or: [
          { email: createUserDto.email },
          { username: createUserDto.username },
        ],
      })
      .exec();

    if (existingUser) {
      if (existingUser.email === createUserDto.email) {
        throw new BadRequestException('Email already exists');
      }
      if (existingUser.username === createUserDto.username) {
        throw new BadRequestException('Username already exists');
      }
    }

    const hashedPassword = await PasswordHelper.hashPassword(
      createUserDto.password,
    );
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateUsername(id: string, username: string): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }
    existingUser.username = username;
    return existingUser.save();
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const hashedPassword = await PasswordHelper.hashPassword(password);
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new BadRequestException('User not found');
    }
    existingUser.password = hashedPassword;
    return existingUser.save();
  }

  async updateEmail(id: string, email: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser && existingUser._id.toString() !== id) {
      throw new BadRequestException('Email already exists');
    }
    const userToUpdate = await this.userModel.findById(id).exec();
    if (!userToUpdate) {
      throw new BadRequestException('User not found');
    }
    userToUpdate.email = email;
    return userToUpdate.save();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async addDeckToUser(userId: string, deckId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $push: { decks_ids: deckId } },
        { new: true },
      )
      .exec();
  }

  async removeDeckFromUser(userId: string, deckId: string): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        { $pull: { decks_ids: deckId } },
        { new: true },
      )
      .exec();
  }
}
