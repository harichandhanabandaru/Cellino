import properties from "../utils/properties.js";
import {
  DownscopedClient,
  GoogleAuth,
  OAuth2Client,
} from "google-auth-library";
import credentials from "../utils/credentials.js";

class ZarrAuthTokenAPI {
  async tokenConsumer() {
    const bucketName = properties.googleCloudBucket;
    // Create the OAuth credentials (the consumer).
    const oauth2Client = new OAuth2Client();
    // We are defining a refresh handler instead of a one-time access
    // token/expiry pair.
    // This will allow the consumer to obtain new downscoped tokens on
    // demand every time a token is expired, without any additional code
    // changes.
    oauth2Client.refreshHandler = async () => {
      // The common pattern of usage is to have a token broker pass the
      // downscoped short-lived access tokens to a token consumer via some
      // secure authenticated channel. For illustration purposes, we are
      // generating the downscoped token locally. We want to test the ability
      // to limit access to objects with a certain prefix string in the
      // resource bucket. objectName.substring(0, 3) is the prefix here. This
      // field is not required if access to all bucket resources are allowed.
      // If access to limited resources in the bucket is needed, this mechanism
      // can be used.
      const refreshedAccessToken = await getZarrAuthToken(bucketName);
      return {
        access_token: refreshedAccessToken.token,
        expiry_date: refreshedAccessToken.expirationTime,
      };
    };
    return { token: (await oauth2Client.refreshHandler()).access_token };
  }
}

async function getZarrAuthToken(bucketName) {
  //   console.log("in get token from broker ",bucketName,objectPrefix,file);
  const googleAuth = new GoogleAuth({
    scopes: "https://www.googleapis.com/auth/devstorage.read_only",
    credentials,
  });
  // Define the Credential Access Boundary object.
  const cab = {
    // Define the access boundary.
    accessBoundary: {
      // Define the single access boundary rule.
      accessBoundaryRules: [
        {
          availableResource: `//storage.googleapis.com/projects/_/buckets/${bucketName}`,
          // Downscoped credentials will have readonly access to the resource.
          availablePermissions: ["inRole:roles/storage.objectViewer"],
          // Only objects starting with the specified prefix string in the object name
          // will be allowed read access.
        },
      ],
    },
  };

  // Obtain an authenticated client via ADC.
  const client = await googleAuth.getClient();

  // Use the client to create a DownscopedClient.
  const cabClient = new DownscopedClient(client, cab);

  // Refresh the tokens.
  // This will need to be passed to the token consumer.
  return await cabClient.getAccessToken();
}

export { ZarrAuthTokenAPI };
