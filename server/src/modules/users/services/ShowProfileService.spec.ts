import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(
      fakeUsersRepository,
    );
  });

  it('should be able to show the profile', async () => {
    const user  = await fakeUsersRepository.create({
      name: 'Diogo Sales',
      email: 'diogosalesdev@gmail.com',
      whatsapp: '81999774252',
      password: '123456'
    });

    const profile = await showProfile.execute({
      user_id: user.id
    });

    expect(profile.name).toBe('Diogo Sales');
    expect(profile.email).toBe('diogosalesdev@gmail.com');
    expect(profile.whatsapp).toBe('81999774252');
  });

  it('should not be able to show the profile from non-existing user', async () => {

    await expect(
      showProfile.execute({
        user_id: 'non-existing-user-id'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
