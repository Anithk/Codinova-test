import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData:any[] = [];
  totalPrice:number = 0;
  placed :string=" ";
  qut: any;
  discountprice: number;
  dateVal  =new Date();

  constructor(
    private cartservice: CartService,
    private changeRef: ChangeDetectorRef
    ) {
      this.cartservice.getCartProducts().subscribe(res => {
      
        this.cartData = JSON.parse(JSON.stringify(res));
        this.getTotalPrice();
        this.discountPrice();
      });
     }

  ngOnInit(): void {

  }

  updateQuantity(operation, item, index) {
    switch (operation) {
      case 'increase':
          item['quantity'] += 1;
          this.cartservice.updateCartData(item , index);
        break;
      case 'decrease':
        if(item['quantity'] == 1)
        {
          console.log(item);
          
          return;
        } 
        console.log(item);
        
        item['quantity'] -= 1;
        this.cartservice.removeCartData(item , index);
        break;
    }
    this.qut = item['quantity']
  }

  getTotalPrice() {
    this.totalPrice = 0;
      this.cartData.forEach(res => {
        this.totalPrice += (res.price * res.quantity);
        // this.totalPrice = this.totalPrice+(res.price*res.quantity) ;
      });
  }
  removeItem(item) {
    const index = this.cartData.findIndex(p => p.id === item);
    // this.cartData.splice(index);
    // this.cartservice.deletecart(item);
    this.cartData.forEach(res => {
      this.cartData.splice(index);
      this.totalPrice += (res.price * 0);
      // this.totalPrice = this.totalPrice+(res.price*res.quantity) ;

    });
    
  }
  discountPrice() {
    this.discountprice = 0;
      this.cartData.forEach(res => {
        this.discountprice += (res.price * res.quantity * 0.10);
        // this.totalPrice = this.totalPrice+(res.price*res.quantity) ;
      });
  }
 EmptyOrNot : boolean;
  orderPlaced(){
    if(this.totalPrice==0){
     // alert("Your Cart is Empty");
      this.EmptyOrNot = true;
    }
    else{
    //alert("Thank You for placing order");
    this.EmptyOrNot = false;
    }
  }
  openModal(){
    const buttonModal = document.getElementById("openModalButton")
    console.log('buttonModal', buttonModal)
    buttonModal.click()
  }
 
}
