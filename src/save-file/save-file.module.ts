import { Module } from '@nestjs/common';
import { SaveFileController } from './save-file.controller';
import { SaveFileService } from './save-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [SaveFileService],
  controllers: [SaveFileController],
})
export class SaveFileModule {}