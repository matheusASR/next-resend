import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 100, nullable: true })
  campaignName: string;

  @Column({ length: 50, nullable: true })
  type: string;

  @Column({ length: 100, nullable: true })
  sender: string;

  @Column({ length: 150, nullable: true })
  subject: string;

  @Column("text", { nullable: true })
  body: string;

  @Column("int", { nullable: true })
  dateDay: number;

  @Column("int", { nullable: true })
  dateMonth: number;

  @Column("int", { nullable: true })
  dateYear: number;

  @Column("int", { nullable: true })
  timeHour: number;

  @Column("int", { nullable: true })
  timeMinute: number;

  @Column("simple-array", { nullable: true })
  receivers: string[];
}
