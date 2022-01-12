import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {

  cart: BehaviorSubject<any>;
  product: any;

  // Constructor
  constructor() {

    // Cart - new behavior subject of product type
    this.cart = new BehaviorSubject(this.product);
  }

  // Implementation -  Set Product 
  setProduct(product: any) {

    // assign product value 
    this.product = product;

    // trigger next - updates the subscribers
    this.cart.next(this.product);
  }

  clearCart(cartItems:any){
    
    cartItems = [];

    this.cart.next(cartItems);
  }
}
