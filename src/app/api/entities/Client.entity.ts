import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Campaign } from "./Campaign.entity";

@Entity("clientes")
export class Client {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ length: 255 })
    nome: string;

    @Column({ type: "boolean", default: true })
    status: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    create_date: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date: Date;

    @OneToMany(() => Campaign, campaign => campaign.client)
    campaigns: Campaign[];
}
