import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TextBlock } from './text-block.entity';

@Injectable()
export class TextBlockService {
  constructor(
    @InjectRepository(TextBlock)
    private textBlockRepository: Repository<TextBlock>,
  ) {}

  async findAll(): Promise<TextBlock[]> {
    return this.textBlockRepository.find();
  }

  async findOneByName(name: string): Promise<TextBlock> {
    return this.textBlockRepository.findOne({ where: { name } });
  }

  async create(textBlockData: Partial<TextBlock>): Promise<TextBlock> {
    const textBlock = this.textBlockRepository.create(textBlockData);
    return this.textBlockRepository.save(textBlock);
  }

  async update(
    id: number,
    textBlockData: Partial<TextBlock>,
  ): Promise<TextBlock> {
    await this.textBlockRepository.update({ id }, textBlockData);
    return this.textBlockRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.textBlockRepository.delete(id);
  }

  async findByGroup(group: string): Promise<TextBlock[]> {
    return this.textBlockRepository.find({ where: { group } });
  }
}
