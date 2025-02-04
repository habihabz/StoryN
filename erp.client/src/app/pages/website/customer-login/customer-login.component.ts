import { Component } from '@angular/core';
import { UserCredential } from '../../../models/usercredential.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoginService } from '../../../services/ilogin.service';
import { ICustomerService } from '../../../services/icustomer.service';
import { CustomerCredential } from '../../../models/customer.credential.model';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {
  currentYear: number=new Date().getFullYear();
  customerCredential: CustomerCredential = new CustomerCredential();

  constructor(
      private http: HttpClient, 
      private router: Router,
      private icustomerService: ICustomerService
  ) {
    
  }

  onCustomerLogin(){
      this.icustomerService.getCustomerLogin(this.customerCredential).subscribe({
         next: (data: CustomerCredential) => {
           if (data.message === "Success") {
             localStorage.setItem('customertoken', data.token);
             sessionStorage.setItem('customer',JSON.stringify(data.customer))
             this.router.navigate(['web-home']);
           } else {
             alert(data.message || 'Login failed');
           }
         },
         error: (error: HttpErrorResponse) => {
           const errorMessage = error.error?.message || 'An unknown error occurred';
           alert(errorMessage);
         }
       });
  }
}
