import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hotel } from '../hotel.model';
import { HotelsService } from '../hotels.service';
import { Subscription } from 'rxjs';
import { Review } from 'src/app/reviews/review.model';
import { ReviewsService } from 'src/app/reviews/review.service';
import { AuthService } from 'src/app/user/auth.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit, OnDestroy {
 searchWord: string;
 hotels: Hotel[] = [];
 reviews: Review[] = [];
 userIsAuthenticated = false;
 adminIsAuthenticated = false;
 public reviewsSub: Subscription;
 private hotelsSub: Subscription;
 private authStatusSub: Subscription;
 private adminAuthStatusSub: Subscription;
 // panelOpenState: boolean = false;

 constructor(public hotelsService: HotelsService, public reviewsService: ReviewsService, private authService: AuthService) {}

 ngOnInit() {
   // fetching all hotels upon page init
   this.hotelsService.getHotels();
   this.hotelsSub = this.hotelsService.getHotelUpdateListener()
  .subscribe((hotels: Hotel[]) => {
    this.hotels = hotels;
  });
  // fetching all existing reviews upon page init
   this.reviewsService.getReviews();
   this.reviewsSub = this.reviewsService.getReviewUpdateListener()
 .subscribe((reviews: Review[]) => {
   this.reviews = reviews;
 });
  // getting user authorization level upon page init
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authStatusSub = this.authService.getAuthStatusListener()
   .subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
   });

   this.adminIsAuthenticated = this.authService.getIsAdminAuth();
   this.adminAuthStatusSub = this.authService.getAdminAuthStatusListener()
   .subscribe(isAuthenticated => {
    this.adminIsAuthenticated = isAuthenticated;
   });
 }

 onDelete(hotelId: string) {
  this.hotelsService.deleteHotel(hotelId);
 }

 ngOnDestroy() {
   this.hotelsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
}
