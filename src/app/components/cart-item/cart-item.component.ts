import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Output() totalCartValue = new EventEmitter<any>();
  @Input() cartData: any;

  // Form Group
  myFormGroup = new FormGroup({
    formField: new FormControl()
  });

  // SnackBar position configurations
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // Increment /decrement related values
  incrementValue: string = "increment";
  decrementValue: string = "decrement";
  color: string = 'default';
  max = 100;
  min = 1;
  step = 1;
  defaultValue: number = 1;

  // Constructor
  constructor(private utilService: UtilService, private _snackBar: MatSnackBar) { }

  // cartItems
  cartItems: any = [];

  ngOnInit(): void {

    // update cart value 
    this.updateCartValue();
  }

  // LifeCycle - on change
  ngOnChanges(changes: SimpleChanges): void {

    if (!!this.cartData) {
      this.addItemToCart(this.cartData);
    }

  }

  // Implementation - get color
  getColor(): string {

    // retunr color
    return this.color;
  }

  // Implementation - Set Color and Quantity
  setColorAndQuantity(color: string, cartItem: any): void {

    // Set color 
    this.color = color;

    // The cart item ideally should not have quantity less than or equal to 0
    if (!cartItem.count) {

      // set cartitem count to 1
      cartItem.count = 1;

      // update cart value
      this.updateCartValue();
    }

  }

  // Implementation - Increment or decrement cart item quantity
  changeValue(valueChangeType: string, cartItem: any): void {

    // if change type is of decrement type, and cart item count is 1
    if (valueChangeType === this.decrementValue && cartItem.count === 1) {

      // return - because the idea of negative products in cart is invalid
      return;
    }

    // else 
    else {

      // set step value (sets to -1 or 1 based on value change type)
      this.step = (valueChangeType === this.decrementValue) ? -Math.abs(this.step) : Math.abs(this.step);

      // calculate input value 
      let inputValue = cartItem.count + this.step;

      // set cart item count 
      cartItem.count = inputValue;

      // finally update cart value 
      this.updateCartValue();
    }

  }

  // Implementation -  on input value change 
  onInputValueChange(event: any, cartItem: any) {

    // prevent default event
    event.preventDefault();

    // change cart item count 
    this.changeCartItemCount(event.target.value, cartItem);

    // update cart value
    this.updateCartValue();

  }

  // Implementation - prevent key events on input 
  preventDefault(event: KeyboardEvent) {

    // prevent default 
    event.preventDefault();
  }

  // Implementation - Change Cart Item Amount 
  changeCartItemCount(countValue: any, cartItem: any) {

    // loop through cart items
    this.cartItems.find((item: any) => {

      // if item already exists and matches the changed cart item 
      if (item.id === cartItem.id) {

        // update the count of product
        item.count = countValue;

        // update total cart value - reflects in total amount
        this.updateCartValue();
      }
    })
  }

  // Implementation - Add Item to cart
  addItemToCart(incomingProduct: any) {

    // check if item already exists
    const found = this.cartItems.some((item: any) => { return item.id === incomingProduct.id });

    // the component has received a new product to be added in cart
    // append it to existing cart items
    if (!!this.cartItems && !this.utilService.objectCheck(incomingProduct)) {

      if (!found || this.cartItems.length === 0) {

        // item is not present in cart, push the new incoming product
        this.cartItems.push(incomingProduct);

        // update cart total value
        this.updateCartValue();
      }
      else {

        // increment product count
        this.incrementProductCount(incomingProduct)
      }
    }

  }

  // Implementation - Increment Product Count
  incrementProductCount(product: any) {

    // loop through cart items
    this.cartItems.find((item: any) => {

      // if item already exists and matches the incoming product 
      if (item.id === product.id) {

        // increment the count of product
        item.count++;

        // update total cart value - reflects in total amount
        this.updateCartValue();
      }
    })
  }


  // Implementation - Update cart value
  // This method essentially loops through all cart items and adds up the total value
  updateCartValue() {

    // set initial value 
    let initialValue = 0;

    // reduce the products array and calculate total cart value
    let totalCartAmount = this.cartItems.reduce(function (previousValue: any, currentValue: any) {
      return previousValue + (currentValue.price * currentValue.count)
    }, initialValue);

    // emit total cart value
    this.totalCartValue.emit(totalCartAmount);
  }

  // Implementation - empty cart 
  emptyCart() {

    // return Cart empty state
    return (!!this.cartItems) ?
      this.cartItems.length <= 0 : false;
  }

  // Implementation - remove cart Item
  removeCartItem(incomingProduct: any) {

    // find the matching cart item
    this.cartItems.find((item: any, index: number) => {

      // if id matches
      if (item.id === incomingProduct.id) {

        // remove cart item from cart
        this.cartItems.splice(index, 1);

      }
    });

    // update Cart Value
    this.updateCartValue();

    // show acknowledgement to user
    this.openSnackBar(incomingProduct.name + ' removed from the cart.', 'X');

  }

   // Implementation - Open Snack Bar (message and button params)
   openSnackBar(message: any, button: any) {

    // snackbar api to open
    this._snackBar.open(message, button, {

      // set horizontal position
      horizontalPosition: this.horizontalPosition,

      // set vertical position
      verticalPosition: this.verticalPosition,

      // duration of snackbar
      duration: 1500,

      // custom class for snackbar colors
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
}


