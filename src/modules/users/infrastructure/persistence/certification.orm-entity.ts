import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";

@Entity("certifications")
export class CertificationOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  issuingOrg?: string;

  @Column({ type: "date", nullable: true })
  dateIssued?: Date;

  @Column({ type: "date", nullable: true })
  expiryDate?: Date;

  @Column({ nullable: true })
  credentialUrl?: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
