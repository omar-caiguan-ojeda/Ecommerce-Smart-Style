import { User } from 'modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.addresses, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column({ type: 'enum', enum: ['SHIPPING', 'BILLING'], default: 'SHIPPING' })
  type: 'SHIPPING' | 'BILLING'; // Tipo de dirección

  @Column({ default: false })
  isDefault: boolean; // Dirección predeterminada
}
