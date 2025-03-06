import { Component, ElementRef } from '@angular/core';
import { DomLayoutType } from 'ag-grid-community';
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
  dbResult: DbResult = new DbResult();
  requestParms: RequestParms = new RequestParms();

  constructor(

    private router: Router,
    private elRef: ElementRef,
    private iproductService: IProductService,
    private snackbarService: SnackBarService,
    private icartService: ICartService,
    private iuser: IuserService,
    private icustomerOrder: ICustomerOrder,
    private geolocationService: GeolocationService

  ) {
    this.currentUser = iuser.getCurrentUser();
  }

  ngOnInit(): void {
    this.getCustomerOrders();
    this.subscription.add(
      this.icustomerOrder.refresh$.subscribe(() => {
        this.getCustomerOrders();

      })
    );

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
