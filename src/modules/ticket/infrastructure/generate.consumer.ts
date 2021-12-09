import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('generate-token-nft-queue')
export class GenerateConsumer {
  @Process('generate-job')
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
