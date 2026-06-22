import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { UserOrmEntity } from "@/modules/users/infrastructure/persistence/user.orm-entity";

@Entity("inquiries")
export class InquiryOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  subject!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ default: "open" })
  status!: string;

  @Column({ nullable: true })
  parentId?: string;

  @ManyToOne(() => UserOrmEntity, { eager: true })
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @ManyToOne(() => InquiryOrmEntity, inquiry => inquiry.replies)
  @JoinColumn({ name: "parentId" })
  parent?: InquiryOrmEntity;

  @OneToMany(() => InquiryOrmEntity, inquiry => inquiry.parent, { eager: true })
  replies?: InquiryOrmEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
