import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { EmailClassification } from "./EmailClassification.entity";
import { Sender } from "./Sender.entity";

@Entity("emails")
export class Email {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    titulo: string;

    @Column("text")
    corpo: string;

    @Column("bytea", { nullable: true })
    imagem: Buffer;

    @ManyToOne(() => EmailClassification, classification => classification.emails)
    classification: EmailClassification;

    @ManyToOne(() => Sender, sender => sender.emails)
    sender: Sender;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;
}
