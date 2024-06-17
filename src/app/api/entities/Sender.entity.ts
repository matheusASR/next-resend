import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Email } from "./Email.entity";

@Entity("senders")
export class Sender {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ length: 255 })
    alias: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;

    @OneToMany(() => Email, email => email.sender)
    emails: Email[];
}
