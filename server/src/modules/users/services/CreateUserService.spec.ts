import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });
  it('should be able to create a new user', async () => {

    const user = await createUser.execute({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      whatsapp: '81999774252',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not be able to create a new user with same e-mail from another', async () => {

    await createUser.execute({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      whatsapp: '81999774252',
      password: '123456'
    });

    await expect(
      createUser.execute({
        name: 'Diogo Sales',
        email: 'diogosalesdev@gmail.com',
        whatsapp: '81998040609',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not be able to create a new user with same whatsapp from another', async () => {

    await createUser.execute({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      whatsapp: '81999774252',
      password: '123456'
    });

    await expect(
      createUser.execute({
        name: 'Diogo Sales',
        email: 'diogosalesdev2@gmail.com',
        whatsapp: '81999774252',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
