import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';


// Services
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchFormControl = new FormControl();
  options = [];
  filteredProducts: Observable<any[]>;
  min:number = 1;


  // Construtor 
  constructor(private productsService: ProductsService) {

    // Implementation - filteredProducts - valuechange event
    this.filteredProducts = this.searchFormControl.valueChanges.pipe(
      startWith(''), // emit given value first
      debounceTime(500), // checks if keypress interval is less than time, cancels further events
      distinctUntilChanged(), // only emit value when current value is different than last

      // cancel the current observable and swith to new observable
      switchMap(val => {
        return this.filter(val || '') // apply filter and return value
      })
    )
  }

  // LifeCycle - OnInit
  ngOnInit(): void {
  }


  // Implementation - get selected product from search list
  getSelectedProduct(selectedProduct: any) {

    console.log('selectedProduct', selectedProduct);
  }

  // Implementation - filter the products from search API
  private filter(val: string): Observable<any[]> {

    // call the API to get product data from Server
    return this.productsService.getData()
      .pipe(
        map(response => response.filter((option: { name: string; }) => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) >= 0
        }))
      )
  }
}
