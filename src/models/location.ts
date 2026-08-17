import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('float')
  latitude!: number;

  @Column('float')
  longitude!: number;

  @CreateDateColumn()
  createdAt!: Date;

  public static create(latitude: number, longitude: number) {
    const location = new Location();
    location.latitude = latitude;
    location.longitude = longitude;
    return location;
  }
}