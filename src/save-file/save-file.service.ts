import { Injectable } from '@nestjs/common';
import { FileEntity } from './file.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SaveFileService {
    constructor(@InjectRepository(FileEntity) private saveFileRepository: Repository<FileEntity>){}

    async createFile(name: string, essenceTable: string, essenceId: number): Promise<FileEntity> {
        const file = new FileEntity();
        file.name = name;
        file.createdAt = new Date();
        file.essenceTable = essenceTable;
        file.essenceId = essenceId;
    
        return await this.saveFileRepository.save(file);
      }
}
