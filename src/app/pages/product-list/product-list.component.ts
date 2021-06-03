import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  changeText: boolean;
  products:any[] = [];
  hoverIdx = -1;
  constructor(private cartservice: CartService) { 
    this.changeText = false;
  }

  ngOnInit(): void {
    this.cartservice.getAllproducts().subscribe(res => this.products = res);
  }

  addToCart(data) {
    this.cartservice.addTocart(data);
  }

}
