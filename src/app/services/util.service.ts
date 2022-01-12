import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  // check if object is empty or null or undefined
  objectCheck(input: any) {

    // return validity of object
    return input && Object.keys(input).length === 0 && input.constructor === Object;
  }
}
