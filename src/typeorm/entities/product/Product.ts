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

  @Column({
    nullable: true,
  })
  color!: string;

  @Column({
    nullable: true,
  })
  category!: string;

  @Column()
  description!: string;

  @Column({
    nullable: true,
  })
  price_sale!: number;

  @Column({
    nullable: true,
  })
  price_buy!: number;

  @Column({
    nullable: true,
  })
  file_name!: string;
}
