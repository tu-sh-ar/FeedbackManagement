import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http: HttpClient) { }

  baseURL:string = environment.baseUrl;

  //get particular product based on id
  getProduct(productId:string):Observable<Product>{
    return this._http.get<Product>(`${this.baseURL}product/${productId}`)
  }

}
