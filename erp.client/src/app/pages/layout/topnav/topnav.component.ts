
import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class TopnavComponent {
  constructor(
    private elRef: ElementRef,
    private router: Router,
   
  ) {
    
  }
  
}
