import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";
import { OpportunityOrmEntity } from "@/modules/opportunities/infrastructure/persistence/opportunity.orm-entity";

@Entity("comments")
export class CommentOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  opportunityId!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ nullable: true })
  parentId?: string;

  @ManyToOne(() => UserOrmEntity, { eager: true })
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @ManyToOne(() => OpportunityOrmEntity)
  @JoinColumn({ name: "opportunityId" })
  opportunity!: OpportunityOrmEntity;

  @ManyToOne(() => CommentOrmEntity, comment => comment.replies)
  @JoinColumn({ name: "parentId" })
  parent?: CommentOrmEntity;

  @OneToMany(() => CommentOrmEntity, comment => comment.parent, { eager: true })
  replies?: CommentOrmEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
