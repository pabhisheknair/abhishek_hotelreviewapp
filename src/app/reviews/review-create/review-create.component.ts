import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReviewsService } from '../review.service';
import { HotelCreateComponent } from '../../hotels/hotel-create/hotel-create.component';
import { Hotel } from '../../hotels/hotel.model';
import { HotelsService } from '../../hotels/hotels.service';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html',
  styleUrls: ['./review-create.component.css']
})

export class ReviewCreateComponent {

  constructor(public reviewsService: ReviewsService, public hotelsService: HotelsService) {}
  hotel: Hotel;


  onAddReview(form: NgForm) {
    if (form.invalid) { return; }
    this.reviewsService.addReview(form.value.rating, form.value.review, form.value.title, form.value.username);
    form.resetForm();
  }
}
