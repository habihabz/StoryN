import { Component, ElementRef } from '@angular/core';
import { Story } from '../../../models/story.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IuserService } from '../../../services/iuser.service';
import { User } from '../../../models/user.model';
import { IStoryService } from '../../../services/istory.service';
import { environment } from '../../../../environments/environment';
import { RequestParms } from '../../../models/requestParms';
import { DbResult } from '../../../models/dbresult.model';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {
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

  getStory(id: number) {
    this.istoryService.getStory(id).subscribe(
      (data: Story) => {
        this.story = data;
      },
      (error: any) => {
      }
    );
  }

  startGame(st_id: number) {
    this.router.navigate(['/story-start', st_id]);
  }
}
