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
        const rs_room = parseInt(this.roomCode, 10);
        this.getStoriesByRoom(rs_room);
      } else {
        // Handle missing roomcode, e.g., redirect or show error
        console.error('Room code not provided in URL');
      }
    });
  }

  getStoriesByRoom(rs_room: number) {
    this.istoryService.getStoriesByRoom(rs_room).subscribe(
      (data: Story[]) => {
        this.stories = data;
      },
      (error: any) => {
        console.error('Failed to fetch stories by room:', error);
      }
    );
  }

  playGame(st_id: number) {
    // Implement play game logic
  }
}
