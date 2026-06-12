import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";

@Entity("saved_opportunities")
@Unique(["userId", "opportunityId"])
export class SavedOpportunityOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  opportunityId!: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @ManyToOne(() => OpportunityOrmEntity)
  @JoinColumn({ name: "opportunityId" })
  opportunity!: OpportunityOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;
}
