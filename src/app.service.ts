import { Injectable } from '@nestjs/common';
import { Knex } from 'knex'
import * as geo from 'geolib'
import { InjectKnex } from './knex/knex.decorators';

@Injectable()
export class AppService {

  constructor(@InjectKnex() private readonly knex: Knex) { }

  public async getBusInfo(busId: number, date: Date) {
    if (!busId) return 'ERR_NO_BUS_ID'
    if (!date) return 'ERR_NO_DATE'
    const busGPSStrings = await this.knex.select('*').from('test_atlas').where({ ident: busId }).whereNot({ lat: '' }).andWhereNot({ lon: '' }).andWhere('device_timestamp', 'like', `%${date}%`).orderBy('device_timestamp')
    let totalDistance: number = 0;
    let lastElement;
    busGPSStrings.forEach((element, index) => {
      if (index != 0) {
        const newDist = geo.getDistance(
          { latitude: lastElement.lat, longitude: lastElement.lon },
          { latitude: element.lat, longitude: element.lon }
        );
        totalDistance = totalDistance + newDist
      }
      lastElement = element
    });
    const lastElementOfArr: number = busGPSStrings.length - 1
    const mapLink = `https://static-maps.yandex.ru/1.x/?ll=${busGPSStrings[0].lon},${busGPSStrings[0].lat}&l=map&pt=${busGPSStrings[0].lon},${busGPSStrings[0].lat},pmwtm1~${busGPSStrings[lastElementOfArr].lon},${busGPSStrings[lastElementOfArr].lat},pmwtm2`

    return {
      totalDistance: totalDistance,
      map: mapLink,
      time: Date.parse(busGPSStrings[lastElementOfArr].device_timestamp) - Date.parse(busGPSStrings[0].device_timestamp)
    }
  }
}
