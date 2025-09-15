import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Story } from '../../../models/story.model';
import { IuserService } from '../../../services/iuser.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../services/isnackbar.service';
import { IMasterDataService } from '../../../services/imaster.data.service';
import { IStoryService } from '../../../services/istory.service';
import { IRoomStoryService } from '../../../services/iroom.story.service';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { RoomStory } from '../../../models/room.story.model';
import { environment } from '../../../../environments/environment';
import { RequestParms } from '../../../models/requestParms';
declare var $: any;

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent {
  apiUrl = `${environment.serverHostAddress}/api/`;
  attachmentUrl = `${environment.attachmentAddress}`;
  stories: Story[] = [];
  currentUser: User = new User();
  subscription: Subscription = new Subscription();
  roomStory: RoomStory = new RoomStory();
  roomStories: RoomStory[] = [];
  roomCode: string = '';
  requestParm:RequestParms =new RequestParms();

  constructor(
    private iuserService: IuserService,
    private elRef: ElementRef,
    private router: Router,
    private snackBarService: SnackBarService,
    private iroomStoryService: IRoomStoryService,
    private istoryService: IStoryService,
    private imasterDataService: IMasterDataService,
    private activatedRoute: ActivatedRoute  // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Read roomcode from URL parameters
    this.activatedRoute.paramMap.subscribe(params => {
      const code = params.get('roomcode');
      if (code) {
        this.roomCode = code;
        // Assuming rs_room is a number derived from roomCode
        this.getStoriesByRoomCode();
      } else {
        // Handle missing roomcode, e.g., redirect or show error
        $("#roomCodeModal").modal("show");
      }
    });
  }

  getStoriesByRoomCode() {
    this.requestParm.code=this.roomCode;
    this.istoryService.getStoriesByRoomCode(this.requestParm).subscribe(
      (data: Story[]) => {
        this.stories = data;
         $("#roomCodeModal").modal("hide");
      },
      (error: any) => {
        console.error('Failed to fetch stories by room:', error);
      }
    );
  }

  playGame(st_id: number) {
    this.router.navigate(['/story', st_id]);
  }
  getRoomCode() {
    if (this.roomCode != '') {
      this.getStoriesByRoomCode();
    }
  }
  openRoomCodeModal(){
      $("#roomCodeModal").modal("show");
  }
}
