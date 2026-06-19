import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { UserOrmEntity } from "./user.orm-entity";

@Entity("user_profiles")
export class UserProfileOrmEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ type: "text", nullable: true })
  bio?: string;

  @Column({ nullable: true })
  profileImage?: string;

  @Column({ nullable: true })
  university?: string;

  @Column({ nullable: true })
  degree?: string;

  @Column({ nullable: true })
  fieldOfStudy?: string;

  @Column({ type: "decimal", nullable: true })
  gpa?: number;

  @Column({ type: "decimal", default: 5 })
  gpaScale?: number;

  @Column({ type: "int", nullable: true })
  graduationYear?: number;

  @Column({ nullable: true })
  countryOfOrigin?: string;

  @Column({ type: "simple-json", nullable: true })
  targetCountries?: string[];

  @Column({ type: "simple-json", nullable: true })
  researchInterests?: string[];

  @Column({ type: "simple-json", nullable: true })
  publications?: string[];

  @Column({ type: "text", nullable: true })
  workExperience?: string;

  @Column({ type: "simple-json", nullable: true })
  skills?: string[];

  @OneToOne(() => UserOrmEntity, user => user.profile)
  @JoinColumn()
  user!: UserOrmEntity;

  @Column()
  userId!: string;
}
