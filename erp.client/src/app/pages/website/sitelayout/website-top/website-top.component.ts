import { Component, ElementRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { GeolocationService } from '../../../../services/GeoCurrentLocation.service';
import { MasterData } from '../../../../models/master.data.model';
import { RequestParms } from '../../../../models/requestParms';
import { ICustomerService } from '../../../../services/icustomer.service';
import { Customer } from '../../../../models/customer.model';
import { User } from '../../../../models/user.model';
import { IuserService } from '../../../../services/iuser.service';

@Component({
  selector: 'app-website-top',
  templateUrl: './website-top.component.html',
  styleUrl: './website-top.component.css'
})
export class WebsiteTopComponent {
  country: MasterData = new MasterData();
  requestParms: RequestParms = new RequestParms();
  currentUser: User = new User();
  currentCountry: string = '';
  constructor(
    private elRef: ElementRef,
    private router: Router,
    private geolocationService: GeolocationService,
    private iuser: IuserService
  ) {
    this.country = this.geolocationService.getCurrentCountry();
    this.currentUser = iuser.getCurrentUser();
  }

  ngOnInit(): void {
    this.fetchCurrentCountry();

  }

  navigateTo(moveto: string) {
    this.router.navigate(['/' + moveto]);
  }

  async fetchCurrentCountry() {
    try {
      this.currentCountry = await this.geolocationService.getUserCountry();
      this.requestParms.name=this.currentCountry;
      this.geolocationService.getCountry(this.requestParms).subscribe(
        (data: MasterData) => {
          this.country=data;
        
          sessionStorage.setItem('country',JSON.stringify(data))
        },
        (error: any) => {
          console.error('Error fetching roles', error);
        }
      );
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  }
}