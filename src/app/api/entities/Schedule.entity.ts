import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Email } from "./Email.entity";
import { Receiver } from "./Receiver.entity";

@Entity("agendamentos")
export class Schedule {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Email, email => email.id)
    email: Email;

    @ManyToOne(() => Receiver, receiver => receiver.schedules)
    receiver: Receiver;

    @Column({ type: "date" })
    data_envio: string;

    @Column({ type: "time" })
    hora_envio: string;

    @Column({ length: 50 })
    status: string;

    @Column("text", { nullable: true })
    erro: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;
}
