import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";

@Entity("applications")
export class ApplicationOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  opportunityId!: string;

  @Column({ default: "interested" })
  status!: string;

  @Column({ type: "text", default: "" })
  notes!: string;

  @Column({ type: "datetime", nullable: true })
  submittedAt?: Date;

  @Column({ type: "datetime", nullable: true })
  deadlineAt?: Date;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @ManyToOne(() => OpportunityOrmEntity)
  @JoinColumn({ name: "opportunityId" })
  opportunity!: OpportunityOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
