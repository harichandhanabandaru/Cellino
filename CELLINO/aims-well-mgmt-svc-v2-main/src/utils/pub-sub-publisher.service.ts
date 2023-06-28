import { Injectable, Logger } from "@nestjs/common";
import { PubSub } from "@google-cloud/pubsub";
import { MlAnalysisRequestPayloadDto } from "../dto/ml-analysis-request-payload.dto";

@Injectable()
export class PubSubPublisherService {
  private logger = new Logger(PubSubPublisherService.name);
  private pubSubClient = new PubSub({
    projectId: process.env.PUB_SUB_PROJECT_ID,
  });

  private async publishMessage(topic: string, data: string, operation: string) {
    const dataBuffer = Buffer.from(data);
    const messageId = await this.pubSubClient
      .topic(topic)
      .publishMessage({ data: dataBuffer, attributes: { operation } });
    this.logger.log(`Message ${messageId} published.`);
  }

  async publishAnalysisRequest(
    mlAnalysisRequestPayloadDto: MlAnalysisRequestPayloadDto
  ) {
    const topic = "aims-analysis-request";
    const operation = "create";
    const data = JSON.stringify(mlAnalysisRequestPayloadDto);
    await this.publishMessage(topic, data, operation);
  }
}
