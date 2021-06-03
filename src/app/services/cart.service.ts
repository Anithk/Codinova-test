import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient){}

  prodcts:any;

  shoppingCart = new BehaviorSubject<any>([]);
  
  getAllproducts() {
    // return this.prodcts.asObservable();
   return this.prodcts = this.http.get<any>('/assets/pos.products.json');
    // return this.prodcts.asObservable();

  }

  getCartProducts() {
    return this.shoppingCart.asObservable();
  }

  addTocart(data) {
    data['quantity'] = 1;
    let availableCartData = this.shoppingCart.value;
    availableCartData.push(data);
    this.shoppingCart.next(availableCartData);
  }

  updateCartData(data, index) {
    let availableCartData = JSON.parse(JSON.stringify(this.shoppingCart.value)) as any;
   
    availableCartData[index] = data;

    this.shoppingCart.next(availableCartData); 
  }

  removeCartData(data, index) {
    let availableCartData = this.shoppingCart.value[index];
    availableCartData.splice(index, 1);
    this.shoppingCart.next(availableCartData);
  }
}
