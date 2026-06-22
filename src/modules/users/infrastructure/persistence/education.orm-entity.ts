import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";

@Entity("educations")
export class EducationOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  userId!: string;

  @Column()
  institution!: string;

  @Column()
  degree!: string;

  @Column()
  fieldOfStudy!: string;

  @Column({ type: "decimal", nullable: true })
  gpa?: number;

  @Column({ type: "decimal", nullable: true })
  gpaScale?: number;

  @Column({ type: "date", nullable: true })
  startDate?: Date;

  @Column({ type: "date", nullable: true })
  endDate?: Date;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: "text", nullable: true })
  thesis?: string;

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
