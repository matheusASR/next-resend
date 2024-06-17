import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CampaignReceiver } from "./CampaignReceiver.entity";
import { Schedule } from "./Schedule.entity";

@Entity("receivers")
export class Receiver {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    nome: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;

    @OneToMany(() => CampaignReceiver, campaignReceiver => campaignReceiver.receiver)
    campaignReceivers: CampaignReceiver[];

    @OneToMany(() => Schedule, schedule => schedule.receiver)
    schedules: Schedule[];
}

