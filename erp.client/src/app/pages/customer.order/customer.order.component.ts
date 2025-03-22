import { Component, ElementRef, ViewChild } from '@angular/core';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { DbResult } from '../../models/dbresult.model';
import { CustomerOrder } from '../../models/customer.order.model';
import { Router } from '@angular/router';
import { IProductService } from '../../services/iproduct.service';
import { SnackBarService } from '../../services/isnackbar.service';
import { ICartService } from '../../services/icart.service';
import { IuserService } from '../../services/iuser.service';
import { GeolocationService } from '../../services/GeoCurrentLocation.service';
import { Customer } from '../../models/customer.model';
import { ICustomerOrder } from '../../services/icustomer.order.service';
import { RequestParms } from '../../models/requestParms';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { GridService } from '../../services/igrid.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CustomerOrderDetail } from '../../models/customer.order.detail.model';
declare var $: any;

@Component({
  selector: 'app-customer.order',
  templateUrl: './customer.order.component.html',
  styleUrl: './customer.order.component.css'
})
export class CustomerOrderComponent {
  pagination = true;
  paginationPageSize5 = 5;
  paginationPageSizeSelector5 = [5, 10, 20, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  currentUser: User = new User();
  subscription: Subscription = new Subscription();
  customerOrder: CustomerOrder = new CustomerOrder();
  customerOrders: CustomerOrder[] = [];
  customerOrderDetails: CustomerOrderDetail[] = [];

  dbResult: DbResult = new DbResult();
  requestParms: RequestParms = new RequestParms();

  @ViewChild('customerOrderGrid') customerOrderGrid!: AgGridAngular;

  constructor(

    private router: Router,
    private elRef: ElementRef,
    private iproductService: IProductService,
    private igridService: GridService,
    private snackBarService: SnackBarService,
    private icartService: ICartService,
    private iuser: IuserService,
    private icustomerOrder: ICustomerOrder,
    private geolocationService: GeolocationService

  ) {
    this.currentUser = iuser.getCurrentUser();
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "co_id" },
    { headerName: "Customer", field: "co_customer_name" },
    { headerName: "Address", field: "co_d_address_details" },
    { headerName: "Quanitity", field: "co_qty" },
    { headerName: "Amount", field: "co_amount" },
    { headerName: "Status", field: "co_status_name" },
    {
      headerName: 'Details', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Details', action: 'onDetails', cssClass: 'btn btn-info', icon: 'fa fa-list', onDetails: (data: any) => this.onAction('details', data)
      }
    }
  ];

  codColDefs: ColDef[] = [
    { headerName: "Id", field: "cd_id" },
    { headerName: "Product", field: "cd_product_name" },
    { headerName: "Size", field: "cd_size_name" },
    { headerName: "Quanitity", field: "cd_qty" },
    { headerName: "Amount", field: "cd_amount" },
    { headerName: "Discount", field: "cd_discount" },
    { headerName: "Tax Amount", field: "cd_tax_amount" },
    { headerName: "Net Amount", field: "cd_net_amount" },
  ];

  ngOnInit(): void {
    this.getCustomerOrders();
    this.subscription.add(
      this.icustomerOrder.refresh$.subscribe(() => {
        this.getCustomerOrders();

      })
    );

  }

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  defaultColDef = {
    sortable: true,
    filter: true
  };

  onAction(action: string, data: any) {
    switch (action) {
      case 'details':
        this.onDetails(data);
        break;

      default:
        this.snackBarService.showError("Unknown Action " + action);;
    }
  }

  onDetails(data: any) { 
    this.icustomerOrder.getCustomerOrderDetails(data.co_id).subscribe(
      (data: CustomerOrderDetail[]) => {
        this.customerOrderDetails = data;
        $("#customerOrderDetailModal").modal("show");
      },
      (error: any) => {

      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    setTimeout(() => {
      this.customerOrderGrid.api.sizeColumnsToFit();
    }, 500); 
  }

  getCustomerOrders() {

    this.icustomerOrder.getCustomerOrders(this.requestParms).subscribe(
      (data: CustomerOrder[]) => {
        this.customerOrders = data;

      },
      (error: any) => {

      }
    );

  }

}
