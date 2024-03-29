import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  dish!: Dish;
  dishErrMsg!: string;
  leaderErrMsg!: string;
  promotionErrMsg!: string;
  promotion!: Promotion;
  leader!: Leader;

  constructor(private dishService: DishService,
    private leaderService: LeaderService,
    private promotionService: PromotionService,
    @Inject('BaseURL') public BaseURL:any) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
    .subscribe((dish) => this.dish = dish,
    errmess => this.dishErrMsg = <any>errmess);
    this.promotionService.getFeaturedPromotion()
    .subscribe((promotion) => this.promotion = promotion,
    errmess => this.promotionErrMsg = <any>errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader) => this.leader = leader,
    errmess => this.leaderErrMsg = <any>errmess);
  }

}
