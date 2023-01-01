import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify<string, string, number, Buffer>(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const user = await this.usersService.find(email);
    if (user.length) {
      throw new BadRequestException('email already in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = await scrypt(password, salt, 32);
    const result = salt + '.' + hash.toString('hex');

    return this.usersService.create(email, result);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');
    const hash = await scrypt(password, salt, 32);

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('incorrect password');

    return user;
  }
}
