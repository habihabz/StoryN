import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { IProductService } from '../../services/iproduct.service';
import { IMasterDataService } from '../../services/imaster.data.service';
import { IuserService } from '../../services/iuser.service';
import { User } from '../../models/user.model';
import { DbResult } from '../../models/dbresult.model';
import { RequestParms } from '../../models/requestParms';
import { MasterData } from '../../models/master.data.model';
import { MasterDataComponent } from '../master-data/master-data.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { SnackBarService } from '../../services/isnackbar.service';
import { GridService } from '../../services/igrid.service';
import { SellingPrice } from '../../models/selling.price.model';
import { ISellingPriceService } from '../../services/iselling.price.service';
import { Subscription } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-price.change',
  templateUrl: './price.change.component.html',
  styleUrl: './price.change.component.css'
})
export class PriceChangeComponent implements OnInit{
  pagination = true;
  paginationPageSize5 = 5;
  paginationPageSizeSelector5 = [5, 10, 20, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  product: Product = new Product();
  products: Product[] = [];
  currentUser: User = new User();
  dbResult: DbResult = new DbResult();
  requestParms: RequestParms = new RequestParms();
  countries:MasterData []=[];
  priceTypes:MasterData []=[];
  priceChangeDetails:any []= [];
  sellingPrices:SellingPrice[]=[];
  sellingPrice:SellingPrice=new SellingPrice();
  private subscription: Subscription = new Subscription();

  @ViewChild('sellingPriceGrid') sellingPriceGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private elRef: ElementRef,
    private router: Router,
    private igridService: GridService,
    private snackBarService: SnackBarService,
    private iproductService: IProductService,
    private imasterDataService: IMasterDataService,
    private isellingPrice :ISellingPriceService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
   
  }
  ngOnInit(): void {
   
    this.getProducts();
    this.getMasterDatasByType("Country", (data) => { this.countries = data; });
    this.getMasterDatasByType("PriceType", (data) => { this.priceTypes = data; });
    this.getSellingPrices();
    this.subscription.add(
      this.isellingPrice.refreshSellingPrices$.subscribe(() => {
        this.getSellingPrices();
      })
    );
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "sp_id" },
    { headerName: "Product", field: "sp_prod_name" },
    { headerName: "Country", field: "sp_country_name" },
    { headerName: "Price Type", field: "sp_price_type_name" },
    { headerName: "Price", field: "sp_price" },
    { 
      headerName: "Start Date", field: "sp_start_date", valueFormatter: (params) => {
        const date = new Date(params.value); 
        if (isNaN(date.getTime()))
           return params.value;
        return date.toISOString().replace('T', ' ').slice(0, 19) + (date.getHours() >= 12 ? ' PM' : ' AM');
      }
    },
    { 
      headerName: "End Date", field: "sp_end_date", valueFormatter: (params) => {
        const date = new Date(params.value); 
        if (isNaN(date.getTime()))
           return params.value;
        return date.toISOString().replace('T', ' ').slice(0, 19) + (date.getHours() >= 12 ? ' PM' : ' AM');
      }
    },
    {
      headerName: 'History', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'history', action: 'onHistory', cssClass: 'btn btn-info', icon: 'fa fa-list', onHistory: (data: any) => this.onAction('history', data)
      }
    }
  ];

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  defaultColDef = {
    sortable: true,
    filter: true
  };

  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      case 'history':
        this.onHistory(data);
        break;
     
      default:
        this.snackBarService.showError("Unknown Action " + action);;
    }
  }

  onEdit(data:any){}
  onDelete(data:any){}
  onHistory(data:any){}

  onGridReady(event: GridReadyEvent) {
    this.igridService.resizeGridColumns(this.sellingPriceGrid.api);

  }


  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
    this.requestParms = new RequestParms();
    this.requestParms.type = masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        callback(data);  // Pass the data to the callback function
      },
      (error: any) => {
        console.error('Error fetching master data', error);
        callback([]);  // Pass an empty array if there's an error
      }
    );
  }
  getProducts() {
    this.iproductService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error: any) => {
      }
    );
  }

  getSellingPrices(){
    this.isellingPrice.getSellingPrices(this.sellingPrice).subscribe(
      (data: SellingPrice[]) => {
        this.sellingPrices = data;        
      },
      (error: any) => {
      }
    );
  }

  onProductChange(p_id:number){ 
     this.sellingPrice.sp_prod_id=p_id; 
     this.getSellingPrices();
   
  }
  onPriceTypeChange(pt_id:number){ 
      this.sellingPrice.sp_price_type=pt_id ;
      this.getSellingPrices();
    
  }
  onCountryChange(c_id:number){ 
    this.sellingPrice.sp_country_id=c_id; 
     this.getSellingPrices();
   
   }

  onFltProductChange(p_id:number){  
       this.sellingPrice.sp_prod_id=p_id;
       this.getSellingPrices();
     
  }
  onFltCountryChange(c_id:number){ 
    this.sellingPrice.sp_country_id=c_id; 
    this.getSellingPrices();
  
  }
  onFltPriceTypeChange(pt_id:number){
     this.sellingPrice.sp_price_type=pt_id ;  
     this.getSellingPrices();
  
  }

  openPriceChangeModal(){
    this.setSelect2Values();
    this.sellingPrice.sp_start_date=new Date().toISOString();
    $('#priceChangeFormModal').modal('show');
   
  }
  changePrice(){
    if(this.sellingPrice.sp_country_id!=0 && this.sellingPrice.sp_price_type!=0 && this.sellingPrice.sp_price>0 && this.sellingPrice.sp_prod_id!=0){
    this.sellingPrice.sp_cre_by = this.currentUser.u_id;
    this.isellingPrice.changePrice(this.sellingPrice).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.isellingPrice.refreshSellingPrices();
          this.sellingPrice=new SellingPrice();
          $('#priceChangeFormModal').modal('hide');
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
       
      }
    );
    }
    else
    {
    this.snackBarService.showError("Please enter All Details");;
    } 
  }
   
  setSelect2Values(){
    $("#prod_id").select2().val(this.sellingPrice.sp_prod_id).trigger("change");
    $("#country_id").select2().val(this.sellingPrice.sp_country_id).trigger("change");
    $("#price_type").select2().val(this.sellingPrice.sp_price_type).trigger("change");

    $("#sp_prod_id").select2().val(this.sellingPrice.sp_prod_id).trigger("change");
    $("#sp_country_id").select2().val(this.sellingPrice.sp_country_id).trigger("change");
    $("#sp_price_type").select2().val(this.sellingPrice.sp_price_type).trigger("change");
  }

}
