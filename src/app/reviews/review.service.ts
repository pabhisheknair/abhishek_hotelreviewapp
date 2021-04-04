import { Review } from './review.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ReviewsService {

  // reviews kept in an array on front-end
  private reviews: Review[] = [];
  private reviewsUpdated = new Subject<Review[]>();

  constructor(private http: HttpClient) {}

  // function to add a review
  addReview(rating: number, review: string, hotelName: string, username: string) {
    const fullReview: Review = {id: null, rating: rating, review: review, hotelName: hotelName, username: username};
    this.http.post<{message: string, reviewId: string}>('http://localhost:3000/api/reviews', fullReview)
    .subscribe((response) => {
      // front-end collection of reviews updated after review is added into the db
      const id = response.reviewId;
      fullReview.id = id;
      this.reviews.push(fullReview);
      this.reviewsUpdated.next([...this.reviews]);
    });
  }

  // fetches all reviews from db
  getReviews() {
    this.http.get<{message: string, reviews: any}>(
      'http://localhost:3000/api/reviews'
      )
      .pipe(map((reviewData) => {
        return reviewData.reviews.map(review => {
          return {
            id: review._id,
            rating: review.rating,
            review: review.review,
            hotelName: review.hotelName,
            username: review.username
          };
        });
      }))
    .subscribe((updatedReviews) => {
      this.reviews = updatedReviews;
      this.reviewsUpdated.next([...this.reviews]);
    });
  }

  getReviewUpdateListener() {
    return this.reviewsUpdated.asObservable();
  }
}
