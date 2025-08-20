import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MasterData } from '../../../models/master.data.model';
import { Cart } from '../../../models/cart.model';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { IProductService } from '../../../services/iproduct.service';
import { SnackBarService } from '../../../services/isnackbar.service';
import { ICartService } from '../../../services/icart.service';
import { IuserService } from '../../../services/iuser.service';
import { DbResult } from '../../../models/dbresult.model';
import { RequestParms } from '../../../models/requestParms';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrl: './favourite.component.css'
})
export class FavouriteComponent  implements OnInit{
  apiUrl = `${environment.serverHostAddress}/api/`; 
  country: MasterData = new MasterData();
  selectedImagePath: string = '';
  cart: Cart = new Cart();
  carts: Cart[] = [];
  currentUser: User = new User();
  quantity: number = 1;
  requestParms:RequestParms=new RequestParms();
  
   constructor(
      private router: Router,
      private elRef: ElementRef,
      private iproductService: IProductService,
      private snackbarService: SnackBarService,
      private icartService: ICartService,
      private iuser: IuserService
    ) { 
      this.currentUser=iuser.getCurrentUser();
  
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
    
        this.requestParms=new RequestParms()
        this.requestParms.country=this.country.md_id;
        this.icartService.getCarts(this.requestParms).subscribe(
          (data: Cart[]) => {
            this.carts = data;
          },
          (error: any) => {
          }
        );
        
      }

    navigateToProduct(productId: number): void {
      this.router.navigate(['/single-product', productId]);
    }
    increaseQuantity(c_id :number): void {
      const cartItem = this.carts.find(c => c.c_id === c_id);
      if (cartItem) {
       cartItem.c_qty++;
      }
    }
  
    decreaseQuantity(c_id :number): void {
      const cartItem = this.carts.find(c => c.c_id === c_id);
      if (cartItem && cartItem.c_qty > 1) {
        cartItem.c_qty--;
      }
    }
  
    saveForLater(c_id :number): void {
      const cartItem = this.carts.find(c => c.c_id === c_id);
    }
  
    removeCart(c_id :number): void {
      const cartItem = this.carts.find(c => c.c_id === c_id);
  
      this.icartService.deleteCart(c_id).subscribe(
            (data: DbResult) => {
              this.carts=this.carts.filter(c=>c.c_id!=c_id);
            },
            (error: any) => {
            }
      );
     
  
    }
}
