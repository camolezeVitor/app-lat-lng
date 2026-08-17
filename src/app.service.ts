import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'rxjs/internal/Subject';
import { Between, Repository } from 'typeorm';
import { Location } from './models/location';

@Injectable()
export class AppService {
  locationSubject = new Subject<Location>();

  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) { }

  async create(latitude: number, longitude: number): Promise<Location> {
    const location = this.locationRepository.create(Location.create(latitude, longitude));
    const saved = await this.locationRepository.save(location);

    this.locationSubject.next(saved);

    return saved;
  }

  async findByRange(init: Date, end: Date): Promise<Location[]> {
    return this.locationRepository.find({
      where: {
        createdAt: Between(init, end),
      },
    });
  }

}
