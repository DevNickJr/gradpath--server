import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";

@Entity("awards")
export class AwardOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  issuingOrg?: string;

  @Column({ type: "date", nullable: true })
  date?: Date;

  @Column({ type: "text", nullable: true })
  description?: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
