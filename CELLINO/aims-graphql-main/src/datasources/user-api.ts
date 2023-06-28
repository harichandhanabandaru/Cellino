import properties from "../utils/properties.js";
import { User } from "../__generated__/resolvers-types.js";
import { Datasource } from "./datasource.js";

class UserApi extends Datasource {
  constructor(options) {
    super();
    this.headers = options.headers;
    this.baseURL = properties.USERAPIServer;
  }

  async getAllActiveUsers(): Promise<User[]> {
    return await this.get(`v1/users`);
  }

  async getUserProfile(userEmail: string): Promise<User> {
    const options = {
      params: {
        email: userEmail,
      },
    };

    return (await this.get(`v1/users`, options))?.[0];
  }

  async getUserProfileById(userId: string): Promise<User> {
    return await this.get(`v1/users/${encodeURIComponent(userId)}`);
  }
}

export { UserApi };
