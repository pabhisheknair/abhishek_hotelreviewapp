import { Hotel } from './hotel.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class HotelsService {
  private hotels: Hotel[] = [];
  private hotelsUpdated = new Subject<Hotel[]>();

constructor(private http: HttpClient, private router: Router) {}

  // retrieves all hotels from database
  getHotels() {
    this.http.get<{message: string, hotels: any}>(
      'http://localhost:3000/api/hotels'
      )
      .pipe(map((hotelData) => {
        return hotelData.hotels.map(hotel => {
          return {
            id: hotel._id,
            title: hotel.title,
            header: hotel.header,
            artist: hotel.artist,
            album: hotel.album,
            zeroByte: hotel.zeroByte,
            year: hotel.year,
            comment: hotel.comment,
            track: hotel.track,
            genre: hotel.genre
          };
        });
      }))
    .subscribe((updatedHotels) => {
      this.hotels = updatedHotels;
      this.hotelsUpdated.next([...this.hotels]);
    });
  }

  getHotelUpdateListener() {
    return this.hotelsUpdated.asObservable();
  }

  // returns hotel based on id from the front-end collection of hotels
  getHotel(id: string) {
    return {...this.hotels.find(s => s.id === id)};
  }

  // adds a hotel to the db by sending a request
  addHotel(title: string, artist: string, album: string, year: string,
          comment: string, track: string, genre: string, header: string, zeroByte: string) {

    const hotel: Hotel = {id: null, title: title, artist: artist, album: album, year: year, comment: comment,
       track: track, genre: genre, header: header, zeroByte: zeroByte};
       
    this.http.post<{message: string, hotelId: string}>('http://localhost:3000/api/hotels', hotel)
    .subscribe((responseData) => {
      const id = responseData.hotelId;
      hotel.id = id;
      this.hotels.push(hotel);
      this.hotelsUpdated.next([...this.hotels]);
    });
  }

  // to remove hotel
  deleteHotel(hotelId: string) {
    this.http.delete('http://localhost:3000/api/hotels/' + hotelId)
    .subscribe(() => {
      const updatedHotels = this.hotels.filter(hotel => hotel.id !== hotelId);
      this.hotels = updatedHotels;
      this.hotelsUpdated.next([...this.hotels]);
    });
  }
}
