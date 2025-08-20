import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { ILoginService } from '../../services/ilogin.service';
import { UserCredential } from '../../models/usercredential.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  credential: UserCredential = new UserCredential();
  currentYear: number = new Date().getFullYear();
  constructor(
    private http: HttpClient,
    private router: Router,
    private iloginService: ILoginService
  ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  onLogin(): void {
    this.iloginService.getLogin(this.credential).subscribe({
      next: (data: UserCredential) => {
        // Handle successful login
        if (data.message === "Success") {
          // Store JWT token in local storage
          localStorage.setItem('token', data.token);
          sessionStorage.setItem('user', JSON.stringify(data.user))
          // Navigate to the home page
          if (data.user.u_is_admin == 'Y') {
            this.router.navigate(['dashboard']);
          }
          else {
            this.router.navigate(['web-home']);
          }

        } else {
          // Handle failed login
          alert(data.message || 'Login failed');
        }
      },
      error: (error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side or network error
          errorMessage = `Client error: ${error.error.message}`;
        }
        else if (error.error?.message) {
          // API returned an error message
          errorMessage = `Server error: ${error.error.message}`;
        }
        else {
          // Unknown error - show more details
          errorMessage = `Unknown error:
        Status: ${error.status}
        Status Text: ${error.statusText}
        Message: ${error.message}
        URL: ${error.url || 'N/A'}`;
        }

        console.error('Full error object:', errorMessage); // For debugging
        alert(errorMessage);
      }
    });
  }
  navigateTo(moveto: string) {

    this.router.navigate(['/' + moveto]);
  }
  logout(): void {
    localStorage.removeItem('token'); // Remove token on logout
    this.router.navigate(['login']);
  }
}
