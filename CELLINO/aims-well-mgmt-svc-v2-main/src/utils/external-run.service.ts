import { Injectable } from "@nestjs/common";
import { ProtocolDto } from "../dto/protocol.dto";
import { EventDto } from "../dto/event.dto";
import { PlateDto } from "../dto/plate.dto";

@Injectable()
export class ExternalRunService {
  private baseUrl = `${process.env.RUN_MGMT_SVC}`;

  async fetchProtocolById(id: string) {
    const res = await fetch(`${this.baseUrl}/v1/protocols/${id}`);
    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(
        `fetchProtocolById: ${JSON.stringify(errorJson, null, 2)}`
      );
    }
    const protocol: ProtocolDto = await res.json();
    return protocol;
  }

  async fetchProtocolByName(name: string) {
    const res = await fetch(`${this.baseUrl}/v1/protocols?name=${name}`);
    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(
        `fetchProtocolByName: ${JSON.stringify(errorJson, null, 2)}`
      );
    }
    const json = await res.json();
    const protocol: ProtocolDto = json?.content?.[0];
    if(!protocol) {
      throw new Error(`No protocol found for ${name}.`);
    }
    return protocol;
  }

  async fetchEventById(id: string) {
    const res = await fetch(`${this.baseUrl}/v1/events/${id}`);
    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(`fetchEventById: ${JSON.stringify(errorJson, null, 2)}`);
    }
    const event: EventDto = await res.json();
    return event;
  }

  async fetchPlateById(id: string) {
    const res = await fetch(`${this.baseUrl}/v1/plates/${id}`);
    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(`fetchPlateById: ${JSON.stringify(errorJson, null, 2)}`);
    }
    const plate: PlateDto = await res.json();
    return plate;
  }

  async fetchPlateByBarcode(barcode: string) {
    const res = await fetch(`${this.baseUrl}/v1/plates?barcode=${barcode}`);
    if (!res.ok) {
      const errorJson = await res.json();
      throw new Error(
        `fetchPlateByBarcode: ${JSON.stringify(errorJson, null, 2)}`
      );
    }
    const json = await res.json();
    const plate: PlateDto = json?.content?.[0];
    if (!plate) {
      throw new Error(`No plate found for ${barcode}.`);
    }
    return plate;
  }
}
