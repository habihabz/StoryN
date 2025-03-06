import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MasterData } from '../../../models/master.data.model';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/isnackbar.service';
import { IProductService } from '../../../services/iproduct.service';
import { ICartService } from '../../../services/icart.service';
import { Cart } from '../../../models/cart.model';
import { User } from '../../../models/user.model';
import { IuserService } from '../../../services/iuser.service';
import { DbResult } from '../../../models/dbresult.model';
import { RequestParms } from '../../../models/requestParms';
import { GeolocationService } from '../../../services/GeoCurrentLocation.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrl: './mycart.component.css'
})
export class MycartComponent implements OnInit {
  apiUrl = `${environment.serverHostAddress}`;
  country: MasterData = new MasterData();
  selectedImagePath: string = '';
  cart: Cart = new Cart();
  carts: Cart[] = [];
  currentUser: User = new User();
  quantity: number = 1;
  requestParms: RequestParms = new RequestParms();

  totalQty: number = 0;
  totalPrice: number = 0;
  deliveryCharge: number = 35;
  netAmount: number = 0;
  discount: number = 0
  constructor(

    private router: Router,
    private elRef: ElementRef,
    private iproductService: IProductService,
    private snackbarService: SnackBarService,
    private icartService: ICartService,
    private iuser: IuserService,
    private geolocationService: GeolocationService

  ) {

    this.currentUser = iuser.getCurrentUser();
    this.country = this.geolocationService.getCurrentCountry();

  }
  ngOnInit(): void {
    this.getCarts();
  }


  getAttachementOfaProduct(p_attachements: string) {
    var att: any;
    if (p_attachements) {
      att = JSON.parse(p_attachements);
    }
    return att;
  }
  selectImage(index: number) {
    const selectedAttachment = this.getAttachementOfaProduct(this.cart.p_attachements)[index];
    this.selectedImagePath = this.apiUrl + '/' + selectedAttachment.pa_image_path;
  }

  getListFromJSON(jsonStr: string) {
    if (jsonStr) {
      return JSON.parse(jsonStr);
    }
    else {
      return null;
    }
  }

  getCarts() {

    this.requestParms = new RequestParms()
    this.requestParms.country = this.country.md_id;
    this.icartService.getCarts(this.requestParms).subscribe(
      (data: Cart[]) => {
        this.carts = data;
        this.getCartTotal();
      },
      (error: any) => {
      }
    );

  }

  navigateToProduct(productId: number): void {
    this.router.navigate(['/single-product', productId]);
  }

  navigateTo(target: string): void {
    this.router.navigate(['/' + target]);
  }

  increaseQuantity(c_id: number): void {
    const cartItem = this.carts.find(c => c.c_id === c_id);
    if (cartItem) {
      cartItem.c_qty++;
      cartItem.c_price = cartItem.c_qty * cartItem.p_price;
    }
    this.getCartTotal();
  }

  decreaseQuantity(c_id: number): void {
    const cartItem = this.carts.find(c => c.c_id === c_id);
    if (cartItem && cartItem.c_qty > 1) {
      cartItem.c_qty--;
      cartItem.c_price = cartItem.c_qty * cartItem.p_price;
    }
    this.getCartTotal();
  }

  saveForLater(c_id: number): void {
    const cartItem = this.carts.find(c => c.c_id === c_id);
  }

  removeCart(c_id: number): void {

    const cartItem = this.carts.find(c => c.c_id === c_id);

    this.icartService.deleteCart(c_id).subscribe(
      (data: DbResult) => {
        if (data.message === 'Success') {
          this.carts = this.carts.filter(c => c.c_id != c_id);
          this.getCartTotal();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
      }
    );


  }
  getCartTotal() {

    this.totalPrice = this.carts.reduce((sum, cart) => sum + (cart.p_price * cart.c_qty), 0);
    this.discount = this.totalPrice * 0.1;
    this.netAmount = (this.totalPrice + this.deliveryCharge) - this.discount;
  }

  placeOrder(){
    alert();
  }
}
