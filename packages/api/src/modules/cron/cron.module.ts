import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Company } from '../../models/ecommerce-analytics /company.entity';
import { SyncVtexCronService } from './syncVtexCron.service';
import { SegmentationStoreService } from './segmentateStore.service';
import { SegmentationVtexCronService } from './segmentateVtex.service';
import { NewUsersCronService } from './newUsers.service';
import { SegmentsCsvService } from './segmentsCsv.service';
import { NewUsersCsvService } from './newUsersCsv.service';
import { UpdateVtexUserCronService } from './updateVtexUserCron.service';

@Module({
  imports: [SequelizeModule.forFeature([Company])],
  providers: [
    SyncVtexCronService,
    SegmentationStoreService,
    SegmentationVtexCronService,
    NewUsersCronService,
    NewUsersCsvService,
    SegmentsCsvService,
    UpdateVtexUserCronService,
  ],
})
export class CronModule {}
