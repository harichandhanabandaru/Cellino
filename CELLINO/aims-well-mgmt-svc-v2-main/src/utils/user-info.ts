import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserInfo {
  getUserId(userProfile: string) {
    try {
      let parsedUserProfile = JSON.parse(userProfile);
      let userId = parsedUserProfile.id;
      return userId;
    } catch (e) {
      throw new NotFoundException(
        `The provided userProfile ${userProfile} is invalid`
      );
    }
  }
  async getUserByEmail(email: string) {
    try {
      return (
        await fetch(`${process.env.USER_SVC_URL}/v1/users?email=${email}`)
      ).json();
    } catch (e) {
      throw new NotFoundException(`The provided email id ${email} is invalid`);
    }
  }

  async getUserById(id: string) {
    try {
      return (await fetch(`${process.env.USER_SVC_URL}/v1/users/${id}`)).json();
    } catch (e) {
      throw new NotFoundException(`The provided user id ${id} is invalid`);
    }
  }
}
