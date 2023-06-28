import properties from "../utils/properties.js";
import { Datasource } from "./datasource.js";
import { Event, QueryEventsArgs } from "../__generated__/resolvers-types";
import { IncomingHttpHeaders } from "http";

class EventApi extends Datasource {
  constructor(options: { headers: IncomingHttpHeaders }) {
    super();
    this.headers = options.headers;
    this.baseURL = `${properties.RUNAPIServer}`;
  }

  async getEvents(args: QueryEventsArgs): Promise<Event[]> {
    const { plateId, eventType } = args;
    const options: {
      params: {
        plateId?: string;
        eventType?: string;
      };
    } = {
      params: {},
    };
    if (plateId) {
      options.params.plateId = plateId;
    }
    if (eventType) {
      options.params.eventType = eventType;
    }
    const urlPath = `v1/events`;
    return await this.get(urlPath, options);
  }

  async getEventById(id: string): Promise<Event> {
    return await this.get(`v1/events/${encodeURIComponent(id)}`);
  }
}

export { EventApi };
