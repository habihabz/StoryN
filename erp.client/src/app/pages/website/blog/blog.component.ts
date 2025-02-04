import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  blogId!: number;
  constructor(
    private router: Router,
    private elRef: ElementRef,
    private route: ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.blogId = +this.route.snapshot.paramMap.get('id')!;
  }
}
