import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { UpdateOrdersConsumer } from '../../consumers/update-orders.consumer';
import { UploadFilesConsumer } from '../../consumers/upload-files.consumer';

const bullConfig = [
  BullModule.forRoot({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  }),
  BullModule.registerQueue({
    name: 'updateOrders',
  }),
  BullModule.registerQueue({
    name: 'uploadFiles',
  }),
];

@Global()
@Module({
  imports: bullConfig,
  providers: [UpdateOrdersConsumer, UploadFilesConsumer],
  exports: [...bullConfig, UpdateOrdersConsumer, UploadFilesConsumer],
})
export class QueueModule {}
