import { Component } from '@angular/core';
import { ICustomerService } from '../../../services/icustomer.service';
import { Customer } from '../../../models/customer.model';
import { Router } from '@angular/router';
import { DbResult } from '../../../models/dbresult.model';
import { User } from '../../../models/user.model';
import { IuserService } from '../../../services/iuser.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrl: './user-registration.component.css'
})
export class UserRegistrationComponent {
  users: User[] = [];
  user: User = new User();
  is_get_updates:boolean=false;
  agree_terms:boolean=false;
  constructor(private iuserService: IuserService, private router: Router) {


  }

  registerUser(): void {
    
    if (this.user.u_name != '' && this.user.u_phone != '' &&
      this.user.u_email != '' && this.user.u_username != ''
      && this.user.u_password != '' && this.user.u_date_of_birth != '' )
      {
      
      this.user.u_is_get_updates= this.is_get_updates+'';
      this.user.u_agree_terms= this.agree_terms+'';
      this.iuserService.registerUser(this.user).subscribe(
        (data: DbResult) => {
          if (data.message === "Success") {
            this.router.navigate(['login']);
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
      alert("Please Enter All Datails !!")
    }

  }
}
