import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthService } from "./auth/auth.service";
import { UserFollowing } from "./user-followings.entity";
import { User } from "./user.entity";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
        @InjectRepository(UserFollowing)
        private userFollowRepo: Repository<UserFollowing>,
      ) {}
     
      public async getUserByUserId(userId: string): Promise<User> {
        return await this.repository.findOne({ where: { id: +userId } });
      }
    
      public async updateUser(
        userId: string,
        newUserDetails: User,
      ): Promise<User> {
        const existingUser = await this.repository.findOne({
          where: { id: +userId },
        });
        if (!existingUser) {
          return null;
        }

        if (newUserDetails.name) existingUser.name = newUserDetails.name;
    
        return await this.repository.save(existingUser);
      }
    
      public async createUserFollowRelation(
        follower: User,
        followeeId: string,
      ) {
        const followee = await this.getUserByUserId(followeeId);
        if (!followee) {
          throw new NotFoundException('User not found');
        }
        const newFollow = await this.userFollowRepo.save({
          follower,
          followee,
        });
        return newFollow.followee;
      }
    
      /**
       * delete a user-user follow pairing
       */
      public async deleteUserFollowRelation(
        follower: User,
        followeeId: string,
      ) {
        const followee = await this.getUserByUserId(followeeId);
        if (!followee) {
          throw new NotFoundException('User not found');
        }
        const follow = await this.userFollowRepo.findOne({
          where: { follower: true, followee: true },
        });
        if (follow) {
          await this.userFollowRepo.delete(follow.id);
          // TODO: future: show show that I do not follow them anymore in the response
          return followee;
        } else {
          throw new NotFoundException('No follow relationship found');
        }
      }
}