import { Exclude } from 'class-transformer';
import { Report } from 'src/reports/report.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id:', this.id);
  }
}
