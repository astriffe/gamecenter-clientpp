import { Hall } from '../model/hall';

export class AddressUtil {
  public static getFullAddress(location: Hall): string {
    return `${location.street} ${location.number}, ${location.zip} ${location.city}`;
  }

  public static getHyperlink(location: Hall): string {
    return `http://map.search.ch/${location.city}/${location.street}.${location.number}`;
  }
}
