import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class UserInfo {
  async getUserByEmail(email: string) {
    try {
      const response = await fetch(`${process.env.USER_SVC_URL}/v1/users?email=${email}`);
      if (response.ok) {
        const userInfoArray = await response.json();
        return userInfoArray[0];
      } else {
        throw Error(`Status: ${response.status}, StatusText: ${response.statusText}`);
      }
    } catch (e) {
      console.error(`The provided email id ${email} is invalid`);
      throw e;
    }
  }

  async getUserById(id: string) {
    try {
      return (await fetch(`${process.env.USER_SVC_URL}/v1/users/${id}`))
        .json()
        .then((response) => response);
    } catch (e) {
      throw new NotFoundException(`The provided user id ${id} is invalid`);
    }
  }

  getUserId(userProfile: string) {
    try {
      let parsedUserProfile = JSON.parse(userProfile);
      return parsedUserProfile.id;
    } catch (e) {
      throw new NotFoundException(`The provided userProfile ${userProfile} is invalid`);
    }
  }
}
