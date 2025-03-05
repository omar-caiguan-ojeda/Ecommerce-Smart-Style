import { Order } from "src/modules/order/entities/order.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, (order) => order.transaction)
  order: Order;

  @Column({ type: 'enum', enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' })
  status: 'PENDING' | 'COMPLETED' | 'FAILED';

  @Column()
  paymentMethod: string;
}
