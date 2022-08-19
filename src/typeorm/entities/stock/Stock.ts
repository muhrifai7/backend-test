import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

import { Product } from "../product/Product";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({
    unique: true,
  })
  name!: string;

  @Column()
  qty!: string;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;
}
