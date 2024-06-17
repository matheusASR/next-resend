import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campaign } from "./Campaign.entity";
import { Receiver } from "./Receiver.entity";

@Entity("campanha_receivers")
export class CampaignReceiver {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @ManyToOne(() => Campaign, campaign => campaign.campaignReceivers)
    campaign: Campaign;

    @ManyToOne(() => Receiver, receiver => receiver.campaignReceivers)
    receiver: Receiver;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;
}
