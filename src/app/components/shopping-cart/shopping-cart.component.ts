import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { CartDataService } from '../../services/cart-data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  @Input() productAddedToCart: any;
  totalAmount: number = 0;
  cartData: any;
  isEmptyCart: boolean;


  totalCartValue(value: any) {

    // assign value
    this.totalAmount = value;

  }

  // Constructor 
  constructor(private cartDataService: CartDataService) {
  }

  // Lifecycle - ngOnInit
  ngOnInit(): void {

    // Subscribe for cart data service 
    this.cartDataService.cart.subscribe(value => {

      // set cart data
      this.cartData = Object.assign({}, value);
    })

  }

  ngOnChanges(chnages:SimpleChange): void{
    console.log('amount',this.totalAmount);

  }

  isTotalZero() : boolean { console.log('amount',this.totalAmount); return this.totalAmount ===0 };

}

