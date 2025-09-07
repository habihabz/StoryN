export class RoomStory {
  rs_id: number;
  rs_room: number;
  rs_story: number;
  rs_story_name :string;
  rs_expire_date: string;
  rs_cre_by: number;
  rs_cre_by_name: string;
  rs_cre_date: string;

  constructor() {
    this.rs_id = 0;
    this.rs_room=0,
    this.rs_story=0,
    this.rs_story_name='',
    this.rs_expire_date=new Date().toISOString().split('T')[0],
    this.rs_cre_by = 0;
    this.rs_cre_by_name = '';
    this.rs_cre_date = '';
  }
}
