import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";

@Entity("opportunities")
export class OpportunityOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column()
  university!: string;

  @Column()
  country!: string;

  @Column()
  opportunityType!: string;

  @Column()
  degreeLevel!: string;

  @Column({ type: "simple-json", default: "[]" })
  fieldsOfStudy!: string[];

  @Column()
  fundingType!: string;

  @Column({ type: "simple-json", default: "[]" })
  benefits!: string[];

  @Column({ type: "datetime" })
  deadline!: Date;

  @Column()
  applicationLink!: string;

  @Column({ nullable: true })
  sourceUrl?: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column()
  createdById!: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "createdById" })
  createdBy!: UserOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
