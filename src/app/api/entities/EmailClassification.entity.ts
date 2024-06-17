import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campaign } from "./Campaign.entity";
import { Email } from "./Email.entity";

@Entity("classificacoes_email")
export class EmailClassification {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    nome: string;

    @ManyToOne(() => Campaign, campaign => campaign.classifications)
    campaign: Campaign;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;

    @OneToMany(() => Email, email => email.classification)
    emails: Email[];
}
