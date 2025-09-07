import { Component, ElementRef } from '@angular/core';
import { Story } from '../../../models/story.model';
import { IuserService } from '../../../services/iuser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IStoryService } from '../../../services/istory.service';
import { RequestParms } from '../../../models/requestParms';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import { DbResult } from '../../../models/dbresult.model';

@Component({
  selector: 'app-story.start',
  templateUrl: './story.start.component.html',
  styleUrl: './story.start.component.css'
})
export class StoryStartComponent {
  apiUrl = `${environment.serverHostAddress}/api/`;
  attachmentUrl = `${environment.attachmentAddress}`;
  storyId!: number;
  story: Story = new Story();
  currentUser: User = new User();
  requestParms: RequestParms = new RequestParms();
  countdown: string = '3.59';

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

  goToPlaygound() {
    this.requestParms.story = this.storyId;
    this.requestParms.user = this.currentUser.u_id;
    this.istoryService.startGame(this.requestParms).subscribe(
      (data: DbResult) => {
        if (data.message == 'Success') {
          this.router.navigate(['/play-ground', this.storyId]);
        }
        else {

        }
      },
      (error: any) => {
      }
    );

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