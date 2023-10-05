import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class IpInfo {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  ipAddress: string;

  @Column('json')
  info: Record<string, any>;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
