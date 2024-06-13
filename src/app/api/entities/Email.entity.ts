import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

interface Receiver {
  name: string;
  email: string;
}

@Entity("emails")
export class Email {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 100, nullable: true })
    campaign_name: string;

    @Column({ length: 50, nullable: true })
    type: string;

    @Column({ length: 100, nullable: true })
    sender: string;

    @Column({ length: 150, nullable: true })
    subject: string;

    @Column("text", { nullable: true })
    body: string;

    @Column("int", { nullable: true })
    date_day: number;

    @Column("int", { nullable: true })
    date_month: number;

    @Column("int", { nullable: true })
    date_year: number;

    @Column("int", { nullable: true })
    time_hour: number;

    @Column("int", { nullable: true })
    time_minute: number;

    @Column("jsonb", { nullable: true })
    receivers: Receiver[];
}

