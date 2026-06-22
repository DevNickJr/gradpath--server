import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";

@Entity("publications")
export class PublicationOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  title!: string;

  @Column({ nullable: true })
  journal?: string;

  @Column({ type: "date", nullable: true })
  date?: Date;

  @Column({ type: "simple-json", nullable: true })
  authors?: string[];

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  type?: string;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
