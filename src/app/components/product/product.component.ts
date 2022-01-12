import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CartDataService } from 'src/app/services/cart-data.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // SnackBar position configurations
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  // product items behaviorsubject
  productItems: BehaviorSubject<any>;

  // Dummy products (will be replaced with DB values)
  products = [{
    id: 1,
    name: "Samsung Phone",
    price: 100,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 2,
    name: "Apple Iphone 12",
    price: 550,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 3,
    name: "Macbook 13 Pro",
    price: 567,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 4,
    name: "Ipad Pro",
    price: 430,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 5,
    name: "Macbook 16 Pro M1",
    price: 2422,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 6,
    name: "Samsung Phone",
    price: 100,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 7,
    name: "Apple Iphone 12",
    price: 550,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 8,
    name: "Macbook 13 Pro",
    price: 567,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 9,
    name: "Ipad Pro",
    price: 430,
    defaultCount: 0,
    count: 1, imageUrl: ""
  },
  {
    id: 10,
    name: "Macbook 16 Pro M1",
    price: 2422,
    defaultCount: 0,
    count: 1, imageUrl: ""
  }
  ];

  // Constructor 
  constructor(private cartDataService: CartDataService, private _snackBar: MatSnackBar,
    private productsService: ProductsService) { }

  // Lifecycle - ngOnInit
  ngOnInit(): void {

    // get all products from server
    this.getProducts();
  }


  // Implementation - get products from server
  getProducts() {

    // call and subscribe to getData method from ProductsService
    this.productsService.getData().subscribe((data) => {

      // assign response 
      this.products = data;

      // Hack/Workaround - set count of each product initally to 1 (used for local cart status maintenance)
      this.products.forEach((product: any) => {
        product.count = 1;
      })

    });
  }


  // Implementation - Add Item to Cart 
  addItemToCart(item: any) {

    // get item from product component and add
    this.cartDataService.setProduct(item);

    // show acknowledgement to user
    this.openSnackBar(item.name + ' added to the cart.', 'X');
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
