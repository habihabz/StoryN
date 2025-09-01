import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { Story } from '../../../models/story.model';
import { IStoryService } from '../../../services/istory.service';

@Component({
  selector: 'app-web.home',
  templateUrl: './web.home.component.html',
  styleUrl: './web.home.component.css'
})
export class WebHomeComponent implements OnInit {
  apiUrl = `${environment.serverHostAddress}/api/`;
  country: MasterData = new MasterData();

  stories: Story[] = [];
  secondandThird: Story[] = [];
  latest: Story = new Story();
  subcategories: MasterData[] = [];
  requestParms: RequestParms = new RequestParms();
  subscription: Subscription = new Subscription();
  attachments: ProdAttachement[] = [];
  attachment: ProdAttachement = new ProdAttachement();
  isMuted = true;
  @ViewChild('myVideo') myVideo!: ElementRef<HTMLVideoElement>;
  constructor(
    private elRef: ElementRef,
    private router: Router,
    private istoryService: IStoryService,
    private iproductService: IProductService,
    private imasterDataService: IMasterDataService,
    private icategoryService: ICategoryService,
    private geolocationService: GeolocationService,

  ) {
    //this.country = this.geolocationService.getCurrentCountry();
  }


  ngOnInit(): void {
    this.getStories();
    this.getMasterDatasByType("SubCategory", (data) => { this.subcategories = data; });

  }
  ngAfterViewInit() {
    const video = this.myVideo.nativeElement;
    video.muted = true;  // start muted so autoplay works
    video.play().catch(err => console.log('Autoplay blocked:', err));
  }

  toggleSound() {
    const video = this.myVideo.nativeElement;
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
    video.play(); // continue playing
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


  navigateToProduct(productId: number) {
    this.router.navigate(['/single-product', productId]);
  }
  navigateToBlog(blogId: number): void {
    this.router.navigate(['/blog', blogId]);
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  getStories() {
    this.istoryService.getStories().subscribe(
      (data: Story[]) => {
        // sort by st_id ascending
        this.stories = data.sort((a, b) => a.st_id - b.st_id);
        this.getLatestGame();
      },
      (error: any) => { }
    );
  }

  playGame(st_id: number) {
    this.router.navigate(['/story', st_id]);
  }

  getLatestGame() {
    if (this.stories.length > 0) {
      this.latest = this.stories[this.stories.length - 1]; // last one = highest st_id
      this.latest.st_image = this.latest.st_image?.replace(/[^\x00-\x7F]/g, "");
    }
  }

  get filteredStories() {
    return this.stories;
  }
  get next2() {
    // take the 2 before latest
    return this.stories.slice(-3, -1);
  }

  get next3() {
    // all except latest, second, third
    return this.stories.slice(0, -3);
  }

  startVideo() {
    this.myVideo.nativeElement.play();
  }

  pauseVideo() {
    this.myVideo.nativeElement.pause();
  }
}
