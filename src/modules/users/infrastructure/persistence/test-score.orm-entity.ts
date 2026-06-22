import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";

@Entity("test_scores")
export class TestScoreOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  testName!: string;

  @Column({ type: "decimal" })
  score!: number;

  @Column({ type: "simple-json", nullable: true })
  subScores?: Record<string, number>;

  @Column({ type: "date", nullable: true })
  dateTaken?: Date;

  @Column({ type: "date", nullable: true })
  expiryDate?: Date;

  @ManyToOne(() => UserOrmEntity)
  @JoinColumn({ name: "userId" })
  user!: UserOrmEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
