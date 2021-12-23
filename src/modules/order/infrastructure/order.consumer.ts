import { StatusEnum } from './../domain/enums/status.enum';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { OrderRepository } from './order.repository';
import { EventService } from './../../event/services/event.service';
import { TatumService } from './../../share/services/tatum.service';

@Processor('order-queue')
export class OrderConsumer {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private readonly eventService: EventService,
    private readonly tatumService: TatumService,
  ) {}
  @Process('order-job')
  async orderJob(
    job: Job<{
      id: string;
      amount: number;
      eventId: string;
      walletAddress: string;
      mnemonic: string;
    }>,
  ) {
    try {
      const { id, amount, eventId, walletAddress, mnemonic } = job.data;
      // const currentBlock = await this.tatumService.getCurrentBlock();
      const address = await this.tatumService.generateAddress(walletAddress, 2);

      // get privateKey
      // const privateKey = await this.tatumService.generatePrivateKey(
      //   mnemonic,
      //   2,
      // );
      // console.log(privateKey);

      //get InfoAccount by address
      // const info = await this.tatumService.getInfoAccount(address);
      // console.log(info);
      // {
      //   address: '0xb5b194d11c9824d6',
      //   balance: 100000,
      //   code: '',
      //   contracts: {},
      //   keys: [ [Object] ]
      // }

      // const generateToken = id + Math.random() * 100 + Math.random() * 100;
      // if (generateToken) {
      //   const order = await this.orderRepository.findOne({ id });
      //   const ticketArr: string[] = order.tickets || [];
      //   ticketArr.push(generateToken);

      //   await this.orderRepository.update(
      //     {
      //       id: id,
      //     },
      //     {
      //       tickets: ticketArr,
      //       status:
      //         ticketArr.length === amount
      //           ? StatusEnum.Done
      //           : StatusEnum.Progress,
      //     },
      //   );

      //   ticketArr.length === amount &&
      //     (await this.eventService.updateAvaiableTickets(eventId, amount));
      // }
    } catch (error) {
      console.log(error);
    }
  }

  // @OnQueueActive()
  // onActive(job: Job) {
  //   console.log(
  //     `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
  //   );
  // }

  // @OnQueueCompleted()
  // onComplete(job: Job, result: any) {
  //   console.log(
  //     `Completed job ${job.id} of type ${job.name}. Result: ${JSON.stringify(
  //       result,
  //     )}`,
  //   );
  // }

  // @OnQueueFailed()
  // onError(job: Job, error: any) {
  //   console.log(
  //     `Failed job ${job.id} of type ${job.name}: ${error.message}`,
  //     error.stack,
  //   );
  // }
}
