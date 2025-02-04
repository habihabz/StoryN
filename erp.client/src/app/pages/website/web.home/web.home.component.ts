import { Component, ElementRef, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { IProductService } from '../../../services/iproduct.service';
import { IMasterDataService } from '../../../services/imaster.data.service';
import { ICategoryService } from '../../../services/icategory.service';
import { Category } from '../../../models/category.model';
import { MasterData } from '../../../models/master.data.model';
import { RequestParms } from '../../../models/requestParms';
import { Subscription } from 'rxjs';
import { ProdAttachement } from '../../../models/prod.attachments.model';
import { environment } from '../../../../environments/environment';
import { GeolocationService } from '../../../services/GeoCurrentLocation.service';

@Component({
  selector: 'app-web.home',
  templateUrl: './web.home.component.html',
  styleUrl: './web.home.component.css'
})
export class WebHomeComponent   implements OnInit{
  apiUrl = `${environment.serverHostAddress}`;
  country: MasterData = new MasterData();
  product:Product=new Product();
  products:Product []=[];
  tempProducts:Product []=[];
  categories: Category[] = [];
  subcategories: MasterData[] = [];
  requestParms: RequestParms = new RequestParms();
  subscription: Subscription = new Subscription();
  attachments:ProdAttachement[]=[];
  attachment:ProdAttachement=new ProdAttachement();
  constructor(
    private elRef: ElementRef,
    private router: Router,
    private iproductService: IProductService,
    private imasterDataService: IMasterDataService,
    private icategoryService: ICategoryService,
    private geolocationService: GeolocationService,

  ) {
    this.country = this.geolocationService.getCurrentCountry();
  }

  
  ngOnInit(): void {
    this.loadCategories();
    this.getProductsByCountry();
    this.getMasterDatasByType("SubCategory", (data) => { this.subcategories = data; });
    this.loadUserCountry();
 
  }
  getProductsByCountry() {
    this.iproductService.getProductsByCountry(this.country.md_id).subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error: any) => {
      }
    );
  }
  loadCategories(): void {
    this.icategoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
       
      }
    );
  }

  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
    this.requestParms = new RequestParms();
    this.requestParms.type = masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        callback(data);  // Pass the data to the callback function
      },
      (error: any) => {
       
        callback([]);  // Pass an empty array if there's an error
      }
    );
  }

  getProductsByCategory(c_id: number) {
   this.tempProducts=this.products.filter(x=>x.p_category==c_id);
   return this.tempProducts;
  }
  getAttachementOfaProduct(p_attachements:string){

    return JSON.parse(p_attachements);
  }
  navigateToProduct(productId: number) {
    this.router.navigate(['/single-product', productId]);
  }
  navigateToBlog(blogId: number): void {
    this.router.navigate(['/blog', blogId]);
  }
  async loadUserCountry() {
    try {
      this.geolocationService.getUserCountry();
    } catch (error) {
    
    }
  }
  addToCart(product:Product){

  }
}
