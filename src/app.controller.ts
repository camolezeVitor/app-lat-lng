import { Body, Controller, Get, Header, Post, Query, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { map } from 'rxjs';
import { Observable } from 'rxjs';
import { readFileSync } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly locationService: AppService) { }
  
  @Get('observe')
  @Header('Content-Type', 'text/html')
  observe() {
    return readFileSync(join(__dirname, '..', 'location', 'observe.html'), 'utf-8');
  }

  @Post('location')
  create(@Body() body: { latitude: number; longitude: number }) {
    return this.locationService.create(body.latitude, body.longitude);
  }

  @Get('track')
  findByRange(@Query('init') init: string, @Query('end') end: string) {
    return this.locationService.findByRange(new Date(init), new Date(end));
  }

  @Sse('location_now')
  locationNow(): Observable<MessageEvent> {
    return this.locationService.locationSubject.asObservable().pipe(
      map((location) => ({ data: location }) as MessageEvent),
    );
  }

}
