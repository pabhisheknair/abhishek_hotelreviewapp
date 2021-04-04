import { PipeTransform, Pipe } from '@angular/core';
import { of } from 'rxjs';
import { Hotel } from '../hotel.model';

@Pipe({
  name: 'hotelFilter'
})
export class HotelFilterPipe implements PipeTransform {
  // first arg might need to be the string of hotels
  transform(hotels: Hotel[], searchTerm: any): Hotel[] {
    if (!hotels || !searchTerm) {
      return hotels;
    }
    // filters applied to the hotel array
    return hotels.filter(hotel =>
       (hotel.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (hotel.artist.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (hotel.album.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (hotel.comment.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (hotel.genre.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)  ||
        (hotel.header.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) ||
        (hotel.year.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1));
  }
}
