import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
} from "typeorm";

import { Stock } from "../stock/Stock";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    unique: true,
  })
  name!: string;

  @Column()
  color!: string;

  @Column()
  description!: string;

  @Column()
  file_name!: string;
}
