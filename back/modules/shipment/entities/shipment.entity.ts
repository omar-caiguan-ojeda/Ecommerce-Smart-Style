import { Order } from 'modules/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.shipment, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;

  @Column()
  carrier: string; // Ejemplo: DHL, FedEx, UPS

  @Column({ unique: true, nullable: true })
  trackingNumber: string; // Código de seguimiento

  @Column({ type: 'enum', enum: ['PENDING', 'SHIPPED', 'DELIVERED', 'RETURNED'], default: 'PENDING' })
  status: 'PENDING' | 'SHIPPED' | 'DELIVERED' | 'RETURNED';

  @Column({ type: 'timestamp', nullable: true })
  shippedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;
}
