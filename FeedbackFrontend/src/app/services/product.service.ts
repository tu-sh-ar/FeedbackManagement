import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  baseURL:string = "http://localhost:4000/api/";

  //get particular product based on id
  getProduct(productId:string):Observable<Product>{
    return this._http.get<Product>(`${this.baseURL}product/${productId}`)
  }

}
