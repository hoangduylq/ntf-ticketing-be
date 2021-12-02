import { UserEntity } from './../domain/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity | undefined> {
  // async findUser(email: string): Promise<any> {
  //   const user = await this.findOne({ email });
  //   if (user) {
  //     return user;
  //   }
  //   return undefined;
  // }
}
