import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  whatsapp: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}


  public async execute({name, email, whatsapp, password}: IRequest): Promise<User> {
    const checkUserExistsByEmail = await this.usersRepository.findByEmail(email);
    const checkUserExistsByWhatsapp = await this.usersRepository.findByWhatsapp(whatsapp);

    if (checkUserExistsByEmail) {
      throw new AppError('E-mail address already used!');
    }

    if (checkUserExistsByWhatsapp) {
      throw new AppError('Whatsapp number already used!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      whatsapp,
      password: hashedPassword
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return user;

  }
}

export default CreateUserService;
