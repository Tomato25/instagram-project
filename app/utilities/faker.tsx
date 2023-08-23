import { faker } from '@faker-js/faker';
import User from "../types/ProfileType"

export function createRandomUser(): User {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
    company: faker.company.name()
  };
}

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 20,
});

export const USERSSUG: User[] = faker.helpers.multiple(createRandomUser, {
  count: 5,
});