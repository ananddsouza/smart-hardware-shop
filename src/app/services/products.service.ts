import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { concatMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // Server URL
  base_url: string = "http://localhost:8080/";


  // Constructor
  constructor(private http: HttpClient) { }

  // Options
  opts = [];

  // Implementation - get Data (returns all products from server)
  getData() {

    // return API call data
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(this.base_url+'api/product/getAllProducts').pipe(tap(data => this.opts = data))
  }

  // get a specific product by id 
  getProductById(productId: number) {

    // return API call data
    return this.http.get(this.base_url+'api/product/' + productId);
  }
}


