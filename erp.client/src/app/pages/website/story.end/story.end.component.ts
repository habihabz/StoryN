import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IStoryService } from '../../../services/istory.service';
import { Story } from '../../../models/story.model';
import { IuserService } from '../../../services/iuser.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../../models/user.model';
import { RequestParms } from '../../../models/requestParms';

@Component({
  selector: 'app-story.end',
  templateUrl: './story.end.component.html',
  styleUrl: './story.end.component.css'
})
export class StoryEndComponent {
  apiUrl = `${environment.serverHostAddress}/api/`;
  storyId!: number;
  story: Story = new Story();
  currentUser: User = new User();
  requestParms: RequestParms = new RequestParms();

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private istoryService: IStoryService,
    private iuser: IuserService
  ) {

    this.currentUser = iuser.getCurrentUser();
  }
  ngOnInit(): void {
    this.storyId = +this.route.snapshot.paramMap.get('id')!;
    this.getStory(this.storyId);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  getStory(id: number) {
    this.istoryService.getStory(id).subscribe(
      (data: Story) => {
        this.story = data;
      },
      (error: any) => {
      }
    );
  }
}
