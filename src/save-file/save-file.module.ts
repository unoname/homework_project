import { Module } from '@nestjs/common';
import { SaveFileController } from './save-file.controller';
import { SaveFileService } from './save-file.service';

@Module({
  controllers: [SaveFileController],
  providers: [SaveFileService],
})
export class SaveFileModule {}
