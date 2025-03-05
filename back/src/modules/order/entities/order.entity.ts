import { Address } from "src/modules/address/entities/address.entity";
import { OrderItem } from "src/modules/order-item/entities/order-item.entity";
import { Shipment } from "src/modules/shipment/entities/shipment.entity";
import { Transaction } from "src/modules/transaction/entities/transaction.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => Shipment, (shipment) => shipment.order, { cascade: true })
  shipment: Shipment;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Address, { nullable: true })
  shippingAddress: Address;

  @Column({ type: 'enum', enum: ['PENDING', 'PAID', 'CANCELLED'], default: 'PENDING' })
  status: 'PENDING' | 'PAID' | 'CANCELLED';

  @OneToOne(() => Transaction, (transaction) => transaction.order)
  transaction: Transaction;
}
