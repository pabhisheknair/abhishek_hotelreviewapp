import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotelsService } from '../hotels.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Hotel } from '../hotel.model';
import { ReviewsService } from 'src/app/reviews/review.service';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css']
})
export class HotelCreateComponent implements OnInit {
  enteredTitle = '';
  enteredArtist = '';
  private mode = 'create';
  private hotelId: string;
  hotel: Hotel;
  hotelTitleInput = '';

  constructor(public hotelsService: HotelsService, public reviewsService: ReviewsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('hotelId')) {
        this.mode = 'addingReview';
        this.hotelId = paramMap.get('hotelId');
        this.hotel = this.hotelsService.getHotel(this.hotelId);
      } else {
        this.mode = 'list';
      }
    });
  }

  onAddHotel(form: NgForm) {
    if (form.invalid) { return; }
    // form values passed to addHotel function in service ts file
    this.hotelsService.addHotel(form.value.title,
       form.value.artist,
        form.value.album,
        form.value.year,
        form.value.comment,
        form.value.track,
        form.value.genre,
        form.value.header,
        form.value.zeroByte
        );
    form.resetForm();
  }

  onAddReview(form: NgForm) {
    if (form.invalid) { return; }
    this.reviewsService.addReview(form.value.rating, form.value.review, form.value.title, form.value.username);
    form.resetForm();
  }
}

