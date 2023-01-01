import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column, AfterInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id:', this.id);
  }
}
