import { Controller, Delete, Get, Param, Put, UseGuards } from "@nestjs/common";
import { DUser } from "./auth/auth.decorator";
import { JwtAuthUserGuard } from "./auth/auth.guard";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthUserGuard)
  @Put("/:userid/follow")
  async followUser(
    @DUser() follower: User,
    @Param("userid") followeeId: string
  ): Promise<User> {
    const followedUser = await this.userService.createUserFollowRelation(
      follower,
      followeeId
    );
    return followedUser;
  }
  
  @UseGuards(JwtAuthUserGuard)
  @Delete("/:userid/follow")
  async unfollowUser(
    @DUser() follower: User,
    @Param("userid") followeeId: string
  ): Promise<User> {
    const unfollowedUser = await this.userService.deleteUserFollowRelation(
      follower,
      followeeId
    );
    return unfollowedUser;
  }

  @UseGuards(JwtAuthUserGuard)
  @Get("/:userid/followers")
  async getFollowersOfUser(): Promise<User[]> {
    return [];
  }
  @UseGuards(JwtAuthUserGuard)
  @Put("/:userid/followees")
  async getFolloweesOfUser(): Promise<User[]> {
    return [];
  }
}
