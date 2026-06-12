import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";

@Entity("documents")
export class DocumentOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  type!: string;

  @Column()
  title!: string;

  @Column({ type: "text" })
  prompt!: string;

  @Column({ type: "text", default: "" })
  content!: string;

  @Column({ default: "pending" })
  status!: string;

  @Column({ type: "simple-json", default: "{}" })
  metadata!: Record<string, any>;

  @Column({ nullable: true })
  opportunityId?: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
