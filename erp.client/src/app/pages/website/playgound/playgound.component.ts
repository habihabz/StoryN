import { Component, ElementRef } from '@angular/core';
import { Story } from '../../../models/story.model';
import { ActivatedRoute, Router } from '@angular/router';
import { IuserService } from '../../../services/iuser.service';
import { User } from '../../../models/user.model';
import { IStoryService } from '../../../services/istory.service';
import { environment } from '../../../../environments/environment';
import { Step } from '../../../models/step.model';
import { RequestParms } from '../../../models/requestParms';
import { IStepService } from '../../../services/istep.service';
import { IAnswerService } from '../../../services/ianswer.service';
import { Answer } from '../../../models/answer.model';
import { DbResult } from '../../../models/dbresult.model';
import { SnackBarService } from '../../../services/isnackbar.service';

@Component({
  selector: 'app-playgound',
  templateUrl: './playgound.component.html',
  styleUrl: './playgound.component.css'
})
export class PlaygoundComponent {
  apiUrl = `${environment.serverHostAddress}/api/`;
  attachmentUrl = `${environment.attachmentAddress}`;
  storyId!: number;
  story: Story = new Story();
  currentUser: User = new User();
  step: Step = new Step();
  answer: Answer = new Answer();
  requestParms: RequestParms = new RequestParms();

  constructor(
    private router: Router,
    private elRef: ElementRef,
    private route: ActivatedRoute,
    private istoryService: IStoryService,
    private istepService: IStepService,
    private ianswerService: IAnswerService,
    private iuser: IuserService,
    private isnackBarService: SnackBarService
  ) {
    this.currentUser = iuser.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }

  }

  ngOnInit(): void {
    this.storyId = +this.route.snapshot.paramMap.get('id')!;
    this.getStory(this.storyId);
    this.getNextStepOfaStory();
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

  playGame(st_id: number) {
    this.router.navigate(['/play-ground', st_id]);
  }


  getNextStepOfaStory() {
    this.requestParms.story = this.storyId;
    this.requestParms.user = this.currentUser.u_id;
    this.istepService.getNextStepOfaStory(this.requestParms).subscribe(
      (data: Step) => {
        this.step = data;
        if (this.step.sp_id == 0) {
          this.router.navigate(['/story-end', this.storyId]);
        }
      },
      (error: any) => {
      }
    );
  }

  createOrUpdateAnswer() {
    this.answer.a_story = this.storyId;
    this.answer.a_step = this.step.sp_id;
    this.answer.a_cre_by = this.currentUser.u_id;
    this.ianswerService.createOrUpdateAnswer(this.answer).subscribe(
      (data: DbResult) => {
        if (data.message == 'Success') {
          this.answer = new Answer();
          this.getNextStepOfaStory();
          this.isnackBarService.showSuccess("Right Answer.");
        }
        else {
          this.isnackBarService.showError(data.message);
        }
      },
      (error: any) => {
      }
    );
  }

}
