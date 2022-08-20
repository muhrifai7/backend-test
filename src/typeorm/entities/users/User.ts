import bcrypt from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { RoleType, Language } from "./userTypes";

@Entity()
export class TU_USER {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    nullable: true,
  })
  basicSalary!: string;

  @Column()
  password!: string;

  @Column({
    default: true as boolean,
  })
  isActive!: boolean;

  @Column({
    default: "ADMINISTRATOR" as RoleType,
  })
  role_name!: string;

  @Column({
    nullable: true,
  })
  username!: string;

  @Column()
  @CreateDateColumn()
  created_at!: Date;

  @Column()
  @UpdateDateColumn()
  updated_at!: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
