import { normalizePort } from "./normalize-port.js";
const properties = {
  port: normalizePort(process.env.PORT || "4000"),
  WellMetaData: process.env.WELL_META_DATA,
  RUNAPIServer: process.env.RUN_API_SERVER,
  USERAPIServer: process.env.USER_API_SERVER,
  googleCloudBucket: process.env.GOOGLE_CLOUD_BUCKET || "aims-storage-dev",
  storageURLOrigin:
    process.env.STORAGE_URL_ORIGIN || "https://storage.googleapis.com",
  cdnUrl: process.env.CDN_URL || "https://cdn.dev.cellinobio.app",
};

export default properties;
