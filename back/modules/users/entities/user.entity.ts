import { Address } from "modules/address/entities/address.entity";
import { Cart } from "modules/cart/entities/cart.entity";
import { Order } from "modules/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string; // URL de la imagen de perfil

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ type: 'enum', enum: ['CLIENT', 'EMPLOYEE', 'ADMIN'], default: 'CLIENT' })
  role: 'CLIENT' | 'EMPLOYEE' | 'ADMIN';

  @Column({ default: true })
  isActive: boolean; // Si la cuenta está activa

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true })
  resetPasswordExpires: Date;

  @Column({ default: false })
  twoFactorEnabled: boolean; // 2FA activado o no

  @CreateDateColumn()
  createdAt: Date; // Fecha de creación automática

  @UpdateDateColumn()
  updatedAt: Date; // Se actualiza cada vez que el usuario edita su perfil

  @Column({ type: 'timestamp', nullable: true })
  lastLogin: Date; // Última vez que inició sesión

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];


  
  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}

