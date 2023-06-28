import { RESTDataSource } from "@apollo/datasource-rest";
import { IncomingHttpHeaders } from "http";

export class Datasource extends RESTDataSource {
  headers: IncomingHttpHeaders;

  constructor() {
    super();
  }

  willSendRequest(path, request) {
    request.headers = { ...request.headers, ...this.headers };
  }
}
