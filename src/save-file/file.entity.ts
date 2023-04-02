import { Column, Entity } from 'typeorm';

@Entity()
export class FileEntity {
  @Column()
  essenceId;
}
